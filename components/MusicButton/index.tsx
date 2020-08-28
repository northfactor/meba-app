import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

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
        {playing === track && (
          <MaterialCommunityIcons
            name="music-note-outline"
            size={16}
            color="black"
            style={{ position: "absolute", top: 8, right: 8 }}
          />
        )}
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default MusicButton;
