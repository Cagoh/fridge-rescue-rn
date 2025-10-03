import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRecipes } from "../context/RecipeContext";

function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { deleteRecipe } = useRecipes();

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteRecipe(recipe.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={styles.heroImage} />
      ) : (
        <View style={[styles.heroImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>

        {(recipe.prepTime || recipe.cookTime || recipe.servings) && (
          <View style={styles.infoContainer}>
            {recipe.prepTime && (
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>⏱️</Text>
                <View>
                  <Text style={styles.infoLabel}>Prep Time</Text>
                  <Text style={styles.infoValue}>{recipe.prepTime}</Text>
                </View>
              </View>
            )}

            {recipe.cookTime && (
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🍳</Text>
                <View>
                  <Text style={styles.infoLabel}>Cook Time</Text>
                  <Text style={styles.infoValue}>{recipe.cookTime}</Text>
                </View>
              </View>
            )}

            {recipe.servings && (
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🍽️</Text>
                <View>
                  <Text style={styles.infoLabel}>Servings</Text>
                  <Text style={styles.infoValue}>{recipe.servings}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {recipe.ingredients && (
              Array.isArray(recipe.ingredients) ? (
                recipe.ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))
              ) : (
                recipe.ingredients.split('\n').map((ingredient, index) => (
                  ingredient.trim() && (
                    <View key={index} style={styles.ingredientItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.ingredientText}>{ingredient.trim()}</Text>
                    </View>
                  )
                ))
              )
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>{recipe.instructions}</Text>
        </View>

        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>🗑️ Delete Recipe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 300,
  },
  placeholderImage: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
    fontSize: 18,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Rubik_400Regular",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  ingredientsList: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 15,
  },
  ingredientItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
    color: "#4CAF50",
  },
  ingredientText: {
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    color: "#333",
    flex: 1,
    lineHeight: 24,
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    lineHeight: 26,
    color: "#333",
  },
  deleteButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    fontWeight: "bold",
  },
});

export default RecipeDetailScreen;