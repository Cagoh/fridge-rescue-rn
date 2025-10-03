import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import { Colors } from "../styles/colors";

const Stack = createNativeStackNavigator();

function MyRecipesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen 
        name="MyRecipesList" 
        component={MyRecipesScreen}
        options={{ title: "My Recipes" }}
      />
      <Stack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen}
        options={{ title: "Recipe Details" }}
      />
    </Stack.Navigator>
  );
}

export default MyRecipesStackNavigator;