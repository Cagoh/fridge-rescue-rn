import { Image, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import Button from "../components/Button";
import { useState } from "react";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useRecipes } from "../context/RecipeContext";

const imageOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

function AddRecipeScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const { addRecipe } = useRecipes();
  
  // Recipe form state
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");

  const handleTakePhoto = async () => {
    try {
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
      const result = await launchImageLibraryAsync(imageOptions);
      if (!result.canceled) setImage(result.assets[0].uri);
    } catch (error) {
      console.log("Error launching image library: ", error);
      alert("An error occurred while launching image gallery.");
    }
  };

  const handleSaveRecipe = () => {
    if (!recipeName.trim()) {
      alert("Please enter a recipe name.");
      return;
    }
    
    if (!ingredients.trim()) {
      alert("Please enter ingredients.");
      return;
    }
    
    if (!instructions.trim()) {
      alert("Please enter instructions.");
      return;
    }

    const recipeData = {
      name: recipeName,
      image: image,
      ingredients: ingredients,
      instructions: instructions,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: servings,
    };
    
    addRecipe(recipeData);
    alert("Recipe saved successfully!");
    
    // Clear form
    setRecipeName("");
    setImage(null);
    setIngredients("");
    setInstructions("");
    setPrepTime("");
    setCookTime("");
    setServings("");
    
    // Navigate to MyRecipes
    navigation.navigate("MyRecipes");
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a Recipe!</Text>

        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipe Photo</Text>
          
          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} />
          )}
          
          <View style={styles.buttonsContainer}>
            <Button onPress={handlePickPhoto}>Pick Photo</Button>
            <Button onPress={handleTakePhoto}>Take Photo</Button>
          </View>
          
          {image && (
            <Button onPress={() => setImage(null)}>Remove Photo</Button>
          )}
        </View>

        {/* Recipe Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Recipe Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Chocolate Chip Cookies"
            value={recipeName}
            onChangeText={setRecipeName}
          />
        </View>

        {/* Time and Servings Row */}
        <View style={styles.rowSection}>
          <View style={styles.smallInputContainer}>
            <Text style={styles.label}>Prep Time</Text>
            <TextInput
              style={styles.input}
              placeholder="15 min"
              value={prepTime}
              onChangeText={setPrepTime}
            />
          </View>

          <View style={styles.smallInputContainer}>
            <Text style={styles.label}>Cook Time</Text>
            <TextInput
              style={styles.input}
              placeholder="30 min"
              value={cookTime}
              onChangeText={setCookTime}
            />
          </View>

          <View style={styles.smallInputContainer}>
            <Text style={styles.label}>Servings</Text>
            <TextInput
              style={styles.input}
              placeholder="4"
              value={servings}
              onChangeText={setServings}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.label}>Ingredients *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter each ingredient on a new line"
            value={ingredients}
            onChangeText={setIngredients}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.label}>Instructions *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter cooking instructions step by step"
            value={instructions}
            onChangeText={setInstructions}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <Button onPress={handleSaveRecipe}>Save Recipe</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik_400Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Rubik_400Regular",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  rowSection: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  smallInputContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  saveButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default AddRecipeScreen;