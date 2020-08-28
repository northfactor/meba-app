import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24,
  },
  container: { flex: 1, padding: 16 },
});

/**
 * Meant to be a debug button to delete all the expo files currently downloaded on the device
 */
const DeleteButton = () => (
  <View style={styles.container}>
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        flex: 1,
      }}
      onPress={async () => {
        const files = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory!
        );

        console.log(files);

        files.forEach(async (file) => {
          const uri = FileSystem.documentDirectory + file;
          console.log(uri);
          await FileSystem.deleteAsync(uri);
        });
      }}
    >
      <Text style={styles.buttonText}>Delete Files</Text>
    </TouchableOpacity>
  </View>
);

export default DeleteButton;
