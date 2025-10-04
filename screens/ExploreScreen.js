import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { findRecipesByIngredients, findRecipesByIngredientsMock } from "../api/spoonacularApi";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../styles/colors";
import Button from "../components/Button";
import AppHeader from "../components/AppHeader";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const renderRecipeItem = ({ item, index }, handleRemoveRecipe) => (
  <View style={styles.recipeItemContainer}>
    <TouchableOpacity
      style={styles.removeRecipeIcon}
      onPress={() => handleRemoveRecipe(index)}
    >
      <Text style={styles.removeIconText}>×</Text>
    </TouchableOpacity>
    <Image source={{ uri: item.image }} style={styles.recipeImage} />
    <Text style={styles.recipeTitle}>{item.title}</Text>
    <Text style={styles.recipeDetail}>Image Type: {item.imageType}</Text>
    <Text style={styles.recipeDetail}>Used Ingredients: {item.usedIngredientCount}</Text>
    <Text style={styles.recipeDetail}>Missed Ingredients: {item.missedIngredientCount}</Text>
  </View>
);

const ItemSeparator = () => <View style={styles.itemSeparator} />;

function ExploreScreen() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopSection, setShowTopSection] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const flatListRef = useRef(null);

  // Recipe form state
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");

  const getRecipe = async () => {
    if (ingredients.length === 0) {
      Alert.alert("Error", "Please add at least one ingredient.");
      return;
    }

    try {
      setIsLoading(true);
      setRecipes([]);
      const response = await findRecipesByIngredients(ingredients);
      if (response.length === 0) {
        Alert.alert("No Recipes Found", "No recipes match the provided ingredients. Try different ingredients.");
        return;
      }
      const formattedRecipes = response.map((recipe) => ({
        id: recipe.id.toString(),
        image: recipe.image,
        title: recipe.title,
        imageType: recipe.imageType,
        usedIngredientCount: recipe.usedIngredientCount,
        missedIngredientCount: recipe.missedIngredientCount,
      }));
      setRecipes(formattedRecipes);
      setShowTopSection(false);
      setIsExpanded(true); // Auto-expand
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403) {
        Alert.alert(
          "CORS Proxy Error",
          "The CORS proxy server is restricting access. Using mock data instead. For full API access, request temporary access at https://cors-anywhere.herokuapp.com or set up your own proxy."
        );
        const mockResponse = findRecipesByIngredientsMock();
        const formattedMockRecipes = mockResponse.map((recipe) => ({
          id: recipe.id.toString(),
          image: recipe.image,
          title: recipe.title,
          imageType: recipe.imageType,
          usedIngredientCount: recipe.usedIngredientCount,
          missedIngredientCount: recipe.missedIngredientCount,
        }));
        setRecipes(formattedMockRecipes);
        setShowTopSection(false);
        setIsExpanded(true); // Auto-expand
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }, 100);
      } else {
        Alert.alert("Error", "Failed to fetch recipes. Please check your connection or try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearRecipes = () => {
    Alert.alert("Clear Recipes", "Are you sure you want to clear all recipes?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          setRecipes([]);
          setShowTopSection(true);
          setIsExpanded(false);
        },
      },
    ]);
  };

  const handleRemoveRecipe = (index) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(newRecipes);
    if (newRecipes.length === 0) {
      setShowTopSection(true);
      setIsExpanded(false);
    }
  };

  const handleEndReached = () => {
    if (!isLoading && recipes.length > 0 && ingredients.length > 0) {
      getRecipe();
    }
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleExpandRecipes = () => {
    if (recipes.length === 0) {
      Alert.alert("No Recipes", "Please fetch recipes first.");
      return;
    }
    setIsExpanded(true);
    setShowTopSection(false);
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  const handleBackToInput = () => {
    setIsExpanded(false);
    setShowTopSection(true); // Always return to top section
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  const handleBackToRecipes = () => {
    setShowTopSection(false); // Show main recipe page
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  const renderIngredientTag = (ingredient, index) => (
    <View key={index} style={styles.ingredientTag}>
      <Text style={styles.ingredientText}>{ingredient}</Text>
      <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
        <Text style={styles.removeIcon}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colors.PRIMARY, Colors.PRIMARY_LIGHT_1]}
    >
      <ImageBackground
        source={require("../assets/images/wallpaper.jpg")}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.container}>
          {!isExpanded && <AppHeader />}
          {!isExpanded && showTopSection && (
            <>
              <Text style={styles.welcomeText}>What's in your fridge?</Text>
              <View style={styles.ingredientContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={currentIngredient}
                    onChangeText={setCurrentIngredient}
                    placeholder="Add ingredient and press Add"
                    onSubmitEditing={handleAddIngredient}
                  />
                  <Button onPress={handleAddIngredient} style={styles.addButton}>
                    Add
                  </Button>
                </View>
                <View style={styles.tagsContainer}>
                  {ingredients.map((ingredient, index) =>
                    renderIngredientTag(ingredient, index)
                  )}
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <Button onPress={getRecipe}>Get Recipe</Button>
                {recipes.length > 0 && (
                  <Button onPress={handleExpandRecipes} style={styles.expandButton}>
                    Expand Recipes
                  </Button>
                )}
                <Button onPress={handleClearRecipes}>Clear</Button>
                {recipes.length > 0 && (
                  <Button onPress={handleBackToRecipes} style={styles.backButton}>
                    Back to Recipes
                  </Button>
                )}
              </View>
            </>
          )}
          <View style={[styles.recipesContainer, isExpanded && styles.recipesContainerExpanded]}>
            {isExpanded && (
              <Button
                onPress={handleBackToInput}
                style={styles.backButtonExpanded}
              >
                Back to Input
              </Button>
            )}
            {!isExpanded && !showTopSection && (
              <Button
                onPress={handleBackToInput}
                style={styles.backButton}
              >
                Back to Input
              </Button>
            )}
            <FlatList
              ref={flatListRef}
              data={recipes}
              keyExtractor={(recipe) => recipe.id}
              renderItem={(props) => renderRecipeItem(props, handleRemoveRecipe)}
              showsVerticalScrollIndicator={false}
              onEndReached={handleEndReached}
              ItemSeparatorComponent={ItemSeparator}
              contentContainerStyle={[
                styles.flatListContent,
                isExpanded && styles.flatListContentExpanded,
              ]}
              ListEmptyComponent={<Text style={styles.emptyText}>🥹 No recipes yet!</Text>}
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
    fontSize: 24,
    marginBottom: 6,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  recipesContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 5,
  },
  recipesContainerExpanded: {
    marginBottom: 0,
  },
  recipeItemContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: SCREEN_WIDTH * 0.85,
  },
  recipeImage: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.6,
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  recipeDetail: {
    fontFamily: "Rubik_400Regular",
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
  },
  removeRecipeIcon: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  removeIconText: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  ingredientContainer: {
    marginHorizontal: 10,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 8,
    padding: 6,
    fontFamily: "Rubik_400Regular",
    backgroundColor: "#fff",
  },
  addButton: {
    paddingHorizontal: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  ingredientTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_LIGHT_1,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  ingredientText: {
    fontFamily: "Rubik_400Regular",
    color: Colors.PRIMARY_TEXT_1,
    fontSize: 14,
  },
  removeIcon: {
    fontSize: 18,
    color: Colors.PRIMARY_TEXT_1,
    marginLeft: 6,
    fontWeight: "bold",
  },
  itemSeparator: {
    height: 10,
  },
  flatListContent: {
    paddingTop: 6,
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  flatListContentExpanded: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  emptyText: {
    fontFamily: "Rubik_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  backButton: {
    flex: 1,
  },
  backButtonExpanded: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  expandButton: {
    flex: 1,
  },
});

export default ExploreScreen;