import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useState } from "react";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";

const imageOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

function AddRecipeScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const handleTakePhoto = async () => {
    try {
      // check if we have permission to use the camera
      if (!cameraPermission.granted) {
        const permissionResult = await requestCameraPermission();

        if (!permissionResult.granted) {
          alert("You need to grant camera permission to use this feature.");
          return;
        }
      }

      const result = await launchCameraAsync(imageOptions);
      if (!result.canceled) setImage(result.assets[0].uri);
    } catch (error) {
      console.log("Error launching camera: ", error);
      alert("Error launching camera.");
    }
  };

  const handlePickPhoto = async () => {
    try {
      const result = await launchImageLibraryAsync();
      if (!result.canceled) setImage(result.assets[0].uri);
      console.log(result);
    } catch (error) {
      console.log("Error launching image library: ", error);
      alert("An error occurred while launching image gallery.");
    }
  };

  const handleSavePhoto = () => {
    navigation.navigate("MyDogs", { dog: image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Choose an existing photo or take a new photo.
      </Text>
      <View style={styles.buttonsContainer}>
        <Button onPress={handlePickPhoto}>Pick a Photo</Button>
        <Button onPress={handleTakePhoto}>Take a Photo</Button>
      </View>
      {!image && (
        <Text style={styles.instructionText}>No photo selected yet.</Text>
      )}
      {image && (
        <>
          <View>
            <Text style={styles.instructionText}>Preview</Text>
            <Image source={{ uri: image }} style={styles.previewImage} />
          </View>
          <View style={styles.buttonsContainer}>
            <Button onPress={handleSavePhoto}>Save</Button>
            <Button onPress={() => setImage(null)}>Clear</Button>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  instructionText: {
    fontFamily: "Rubik_400Regular",
    textAlign: "center",
    paddingVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 12,
  },
});

export default AddRecipeScreen;
