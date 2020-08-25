import Dropbox from "react-native-dropbox-sdk";
import { Audio } from "expo-av";
import React, { useState, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import MusicButton from "../components/MusicButton";

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

const RIVER_MASTER = "/audio/river-master.mp3";
const FIFTEEN_MIN_BREATH = "/audio/15-min-breath-train.mp3";
const SEVEN_MINUTE_RESET = "/audio/7-min-reset.mp3";
const TEN_MINUTE_NEXUS = "/audio/10-min-nexus.mp3";

const playTrack = async (
  soundObject: Audio.Sound,
  track: string,
  playing: boolean,
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!playing) {
    setPlaying(true);

    const dropboxTrack = await new Dropbox({
      accessToken:
        "lZoJuE_3pKwAAAAAAAAAAcoLnHCTjup6YMWiU5W0Fqyjs8v2P7p9JnOli75wdq0n",
    }).filesGetTemporaryLink({ path: track });

    try {
      await soundObject.loadAsync({ uri: dropboxTrack.link });
      await soundObject.playAsync();
    } catch (error) {}
    return;
  }

  setPlaying(false);
  try {
    await soundObject.unloadAsync();
  } catch {}
};

const Home = () => {
  const [playing, setPlaying] = useState(false);
  const soundObject = useRef(new Audio.Sound());

  const musicButtonProps = { soundObject, playing, playTrack, setPlaying };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={RIVER_MASTER} {...musicButtonProps}>
          <Text style={styles.buttonText}>River Master</Text>
        </MusicButton>
        <MusicButton track={FIFTEEN_MIN_BREATH} {...musicButtonProps}>
          <Text style={styles.buttonText}>15 Minute Breath Train</Text>
        </MusicButton>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={SEVEN_MINUTE_RESET} {...musicButtonProps}>
          <Text style={styles.buttonText}>Metal</Text>
        </MusicButton>
        <MusicButton track={TEN_MINUTE_NEXUS} {...musicButtonProps}>
          <Text style={styles.buttonText}>10 Minute Nexus</Text>
        </MusicButton>
      </View>
    </View>
  );
};

export default Home;
