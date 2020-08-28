import { Audio } from "expo-av";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface MusicButtonProps {
  children: React.ReactElement;
  soundObject: React.MutableRefObject<Audio.Sound>;
  track: any;
  playing: boolean;
  playTrack: (
    soundObject: Audio.Sound,
    track: any,
    playing: boolean,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    progressCallback: any
  ) => void;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  progressCallback: any;
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    padding: 16,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    flex: 1,
  },
});

const MusicButton = (props: MusicButtonProps) => {
  const {
    children,
    soundObject,
    track,
    playing,
    playTrack,
    setPlaying,
    progressCallback,
  } = props;
  return (
    <View style={styles.buttonView}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          playTrack(
            soundObject.current,
            track,
            playing,
            setPlaying,
            progressCallback
          );
        }}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default MusicButton;
