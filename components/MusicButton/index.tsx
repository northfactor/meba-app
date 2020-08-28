import { Audio } from "expo-av";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { mebaGreen } from "../../constants/Colors";

interface MusicButtonProps {
  children: React.ReactElement;
  soundObject: React.MutableRefObject<Audio.Sound>;
  track: any;
  playing: string | null;
  playTrack: (
    soundObject: Audio.Sound,
    track: any,
    playing: string | null,
    setPlaying: React.Dispatch<React.SetStateAction<string | null>>,
    progressCallback: any
  ) => void;
  setPlaying: React.Dispatch<React.SetStateAction<string | null>>;
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
  playingButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: mebaGreen,
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

  const getButtonStyle = (
    playing: MusicButtonProps["playing"] | null,
    track: MusicButtonProps["track"]
  ) => {
    if (playing === track) {
      return styles.playingButton;
    }

    return styles.button;
  };

  return (
    <View style={styles.buttonView}>
      <TouchableOpacity
        style={getButtonStyle(playing, track)}
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
