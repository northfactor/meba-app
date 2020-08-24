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

const CALM_TRACK = require("../assets/audio/river-master.mp3");
const ENERGIZE_TRACK = require("../assets/audio/15-min-breath-train.mp3");
const METAL_TRACK = require("../assets/audio/7-min-reset.mp3");
const PSYCHEDELIC_TRACK = require("../assets/audio/10-min-nexus.mp3");

const playTrack = async (
  soundObject: Audio.Sound,
  track: any,
  playing: boolean,
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!playing) {
    setPlaying(true);
    try {
      await soundObject.loadAsync(track);
      await soundObject.playAsync();
    } catch (error) { }
    return;
  }

  setPlaying(false);
  try {
    await soundObject.unloadAsync();
  } catch { }
};

const Home = () => {
  const [playing, setPlaying] = useState(false);
  const soundObject = useRef(new Audio.Sound());

  const musicButtonProps = { soundObject, playing, playTrack, setPlaying };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={CALM_TRACK} {...musicButtonProps}>
          <Text style={styles.buttonText}>River Master</Text>
        </MusicButton>
        <MusicButton track={ENERGIZE_TRACK} {...musicButtonProps}>
          <Text style={styles.buttonText}>15 Minute Breath Train</Text>
        </MusicButton>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MusicButton track={METAL_TRACK} {...musicButtonProps}>
          <Text style={styles.buttonText}>7 Minute Reset</Text>
        </MusicButton>
        <MusicButton track={PSYCHEDELIC_TRACK} {...musicButtonProps}>
          <Text style={styles.buttonText}>10 Minute Nexus</Text>
        </MusicButton>
      </View>
    </View>
  );
};

export default Home;
