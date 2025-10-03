import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useRecipes } from "../context/RecipeContext";

function MyRecipesScreen({ navigation }) {
  const { recipes } = useRecipes();

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
      ) : (
        <View style={[styles.recipeImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      
      <View style={styles.cardContent}>
        <Text style={styles.recipeName}>{item.name}</Text>
        
        <View style={styles.recipeInfo}>
          {item.prepTime && (
            <Text style={styles.infoText}>⏱️ Prep: {item.prepTime}</Text>
          )}
          {item.cookTime && (
            <Text style={styles.infoText}>🍳 Cook: {item.cookTime}</Text>
          )}
          {item.servings && (
            <Text style={styles.infoText}>🍽️ Serves: {item.servings}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recipes yet!</Text>
          <Text style={styles.emptySubtext}>
            Tap the + button to add your first recipe
          </Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: "100%",
    height: 200,
  },
  placeholderImage: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
  },
  cardContent: {
    padding: 15,
  },
  recipeName: {
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
    marginBottom: 10,
    color: "#333",
  },
  recipeInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik_400Regular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 24,
    fontFamily: "Rubik_400Regular",
    color: "#666",
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default MyRecipesScreen;