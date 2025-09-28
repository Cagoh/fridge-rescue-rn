import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

function MyRecipesScreen({ route }) {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    if (route.params?.recipe) {
      setMyRecipes((prevRecipes) => [
        ...prevRecipes,
        { id: randomUUID(), url: route.params?.recipe },
      ]);
    }
  }, [route.params?.recipe]);

  return (
    <View style={styles.container}>
      <FlatList
        data={myRecipes}
        // keyExtractor={}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: "center", marginTop: 32 }}>
            <Text>No recipes yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
export default MyRecipesScreen;
