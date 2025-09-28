import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import axios from "axios";
import * as Crypto from "expo-crypto";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../styles/colors";
import Button from "../components/Button";
import AppHeader from "../components/AppHeader";

const API_URL = "https://dog.ceo/api/breeds/image/random";

const renderDogItem = ({ item }) => (
  <Image source={{ uri: item.url }} style={styles.dogImage} />
);

function ExploreScreen() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const getDog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      // ...prevState: spread out the prev array of dog urls
      setDogs((prevState) => [
        ...prevState,
        { id: Crypto.randomUUID(), url: response.data.message },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch dog. Please try again.");
    } finally {
      // console.log("this block will always run")
      setIsLoading(false);
    }
  };

  const scrollToEnd = () => flatListRef.current.scrollToEnd({ animated: true });

  const handleClearDogs = () => {
    Alert.alert("Clear Dogs", "Are you sure you want to clear all dogs?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => setDogs([]),
      },
    ]);
  };

  const handleEndReached = () => {
    // Load more dogs when the end is reached
    // Only fetch if not loading and there are existing dogs
    if (!isLoading && dogs.length > 0) {
      getDog();
    }
  };
  return (
    <>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontFamily: "Rubik_400Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 20,
  },
  dogsContainer: {
    flex: 1,
    alignItems: "center",
  },
  dogImage: {
    width: 350,
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
  loadingOverlay: {
    // provide all properties to make a component absolute fill its parent
    // shortcut for overlays, backgrounds
    // set position absolute top 0, right 0, bottom 0, left 0
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});

export default ExploreScreen;
