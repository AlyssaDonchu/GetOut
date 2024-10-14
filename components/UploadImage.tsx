import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

const UploadImage = ({ image, name, onChange }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(name, result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      {!!image ? (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <FontAwesome name="user" size={60} color="#bbbbbb" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#bbbbbb",
    borderWidth: 1,
    padding: 10,
    borderRadius: 90,
    marginVertical: 10,
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#bbbbbb",
    borderWidth: 1,
    padding: 10,
    borderRadius: 90,
    marginVertical: 10,
    width: 140,
    height: 140,
    alignSelf: "center",
  },
});
