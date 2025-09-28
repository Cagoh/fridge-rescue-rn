import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configure Settings</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontFamily: "Rubik_700Bold",
  },
});

export default SettingsScreen;
