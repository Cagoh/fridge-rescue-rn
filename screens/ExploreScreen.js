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

const API_URL = "https://recipe.ceo/api/breeds/image/random";

const renderRecipeItem = ({ item }) => (
  <Image source={{ uri: item.url }} style={styles.recipeImage} />
);

function ExploreScreen() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const getRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      // ...prevState: spread out the prev array of Recipe urls
      setRecipes((prevState) => [
        ...prevState,
        { id: Crypto.randomUUID(), url: response.data.message },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch recipe. Please try again.");
    } finally {
      // console.log("this block will always run")
      setIsLoading(false);
    }
  };

  const scrollToEnd = () => flatListRef.current.scrollToEnd({ animated: true });

  const handleClearRecipes = () => {
    Alert.alert("Clear Recipes", "Are you sure you want to clear all recipes?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => setrecipes([]),
      },
    ]);
  };

  const handleEndReached = () => {
    // Load more recipe when the end is reached
    // Only fetch if not loading and there are existing recipes
    if (!isLoading && recipes.length > 0) {
      getRecipe();
    }
  };
return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colors.PRIMARY_LIGHT_2, Colors.PRIMARY_LIGHT_1]}
    >
      <ImageBackground
        source={require("../assets/images/wallpaper.jpg")}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.container}>
          <AppHeader />
          <Text style={styles.welcomeText}>👋 Welcome! Get a recipe!</Text>
          <View style={styles.buttonsContainer}>
            <Button onPress={getRecipe}>Get Recipe</Button>
            <Button onPress={handleClearRecipes}>Clear</Button>
          </View>
          <View style={styles.recipesContainer}>
            <FlatList
              ref={flatListRef}
              data={recipes}
              // Tell FlatList which id to use (key)
              keyExtractor={(recipe) => recipe.id}
              renderItem={renderRecipeItem}
              // onContentSizeChange={scrollToEnd}
              showsVerticalScrollIndicator={false}
              onEndReached={handleEndReached}
              ListEmptyComponent={<Text>🥹 No recipes yet!</Text>}
            />
          </View>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
          )}
        </View>
      </ImageBackground>
    </LinearGradient>
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
  recipesContainer: {
    flex: 1,
    alignItems: "center",
  },
  recipeImage: {
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
