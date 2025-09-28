import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

function MyRecipesScreen({ route }) {
  const [myDogs, setMyDogs] = useState([]);

  useEffect(() => {
    if (route.params?.dog) {
      setMyDogs((prevDogs) => [
        ...prevDogs,
        { id: randomUUID(), url: route.params?.dog },
      ]);
    }
  }, [route.params?.dog]);

  return (
    <View style={styles.container}>
      <FlatList
        data={myDogs}
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
