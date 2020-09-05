import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import MusicButton from "../components/MusicButton";
import DeleteButton from "../components/DeleteButton";
import { mebaGreen } from "../constants/Colors";

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24,
  },
  container: {
    padding: 16,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const METAL = "metal.mp3";
const INSTRUCTIONS = "instructions.mp3";
const RIVER_MASTER = "river-master.mp3";
const SEVEN_MINUTE_RESET = "7-min-reset.mp3";
const RIDE_THE_TIGER = "ride-the-tiger.mp3";

const playTrack = async (
  soundObject: Audio.Sound,
  track: string,
  playing: string | null,
  setPlaying: React.Dispatch<React.SetStateAction<any>>,
  progressCallback: any
) => {
  if (!playing) {
    setPlaying(track);

    const reallocateUrl = "http://reallocate.org/wp-content/uploads/";

    let dlTrack = null;
    const fileSystemTrack = FileSystem.documentDirectory + track;

    const existingFile = await FileSystem.getInfoAsync(fileSystemTrack);

    if (existingFile.exists) {
      dlTrack = { uri: existingFile.uri };
    } else {
      const downloadResumable = FileSystem.createDownloadResumable(
        `${reallocateUrl}${track}`,
        fileSystemTrack,
        {},
        progressCallback
      );

      dlTrack = await downloadResumable.downloadAsync();
    }

    if (dlTrack) {
      try {
        await soundObject.loadAsync(dlTrack);
        await soundObject.playAsync();
      } catch (error) {}
    }

    return;
  }

  setPlaying(null);
  try {
    await soundObject.unloadAsync();
  } catch {}
};

const Home = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
  }, []);

  const soundObject = useRef(new Audio.Sound());

  const progressCallback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress(progress);
  };

  const musicButtonProps = {
    soundObject,
    playing,
    playTrack,
    setPlaying,
    progressCallback,
  };

  const isLoading = (progress: number) => progress != 0 && progress != 1;

  return (
    <View style={styles.container}>
      {isLoading(progress) && (
        <Progress.Bar progress={progress} width={null} color={mebaGreen} />
      )}
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={INSTRUCTIONS} {...musicButtonProps}>
          <Text style={styles.buttonText}>Instructions</Text>
        </MusicButton>
        <MusicButton track={RIVER_MASTER} {...musicButtonProps}>
          <Text style={styles.buttonText}>River Master</Text>
        </MusicButton>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={SEVEN_MINUTE_RESET} {...musicButtonProps}>
          <Text style={styles.buttonText}>7-Minute Reset</Text>
        </MusicButton>
        <MusicButton track={RIDE_THE_TIGER} {...musicButtonProps}>
          <Text style={styles.buttonText}>Ride The Tiger</Text>
        </MusicButton>
        {/* The DeleteButton below is meant to be use for debugging. 
        It will delete any local meba files that were previously downloaded to your device. */}
        <DeleteButton />
      </View>
    </View>
  );
};

export default Home;
