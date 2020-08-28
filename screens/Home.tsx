import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { useState, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import MusicButton from "../components/MusicButton";
import DeleteButton from "../components/DeleteButton";
import { isLoading } from "expo-font";

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
const RIVER_MASTER = "river-master.mp3";
const FIFTEEN_MIN_BREATH = "15-min-breath-train.mp3";
const SEVEN_MINUTE_RESET = "7-min-reset.mp3";
const TEN_MINUTE_NEXUS = "10-min-nexus.mp3";

const playTrack = async (
  soundObject: Audio.Sound,
  track: string,
  playing: boolean,
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  progressCallback: any
) => {
  if (!playing) {
    setPlaying(true);

    const reallocateUrl = "http://reallocate.org/wp-content/uploads/2020/08/";

    let dlTrack = null;
    const fileSystemTrack = FileSystem.documentDirectory + track;

    const existingFile = await FileSystem.getInfoAsync(fileSystemTrack);
    console.log("existingFile", existingFile);

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
      console.log("Finished downloading to ", dlTrack);
    }

    console.log(dlTrack);

    if (dlTrack) {
      try {
        await soundObject.loadAsync(dlTrack);
        await soundObject.playAsync();
      } catch (error) {}
    }

    return;
  }

  setPlaying(false);
  try {
    await soundObject.unloadAsync();
  } catch {}
};

const Home = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const soundObject = useRef(new Audio.Sound());

  const progressCallback = (downloadProgress: any) => {
    console.log("downloadProgress", downloadProgress);
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

  console.log("Progress", progress);

  const isLoading = (progress: number) => progress != 0 && progress != 1;

  console.log(isLoading(progress));

  return (
    <View style={styles.container}>
      {isLoading(progress) && <Progress.Bar progress={progress} width={null} />}
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={METAL} {...musicButtonProps}>
          <Text style={styles.buttonText}>Metal</Text>
        </MusicButton>
        <MusicButton track={RIVER_MASTER} {...musicButtonProps}>
          <Text style={styles.buttonText}>River Master</Text>
        </MusicButton>
        <MusicButton track={FIFTEEN_MIN_BREATH} {...musicButtonProps}>
          <Text style={styles.buttonText}>15 Minute Breath Train</Text>
        </MusicButton>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={SEVEN_MINUTE_RESET} {...musicButtonProps}>
          <Text style={styles.buttonText}>7 Minute Reset</Text>
        </MusicButton>
        <MusicButton track={TEN_MINUTE_NEXUS} {...musicButtonProps}>
          <Text style={styles.buttonText}>10 Minute Nexus</Text>
        </MusicButton>
        <DeleteButton />
      </View>
    </View>
  );
};

export default Home;
