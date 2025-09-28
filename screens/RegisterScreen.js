import { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../styles/colors";
import Button from "../components/Button";

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    Alert.alert(
      "Mock Registration",
      "This is just a mock registration function."
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/wallpaper.jpg")}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={Colors.PRIMARY_LIGHT_2}
          selectionColor={Colors.PRIMARY_LIGHT_2}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={Colors.PRIMARY_LIGHT_2}
          selectionColor={Colors.PRIMARY_LIGHT_2}
        />
        <View style={styles.buttonsContainer}>
          <Button onPress={handleRegister}>Register</Button>
          <Button onPress={() => navigation.goBack()}>Back to Login</Button>
        </View>
      </View>
    </ImageBackground>
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
    color: Colors.PRIMARY,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    // borderColor: "#ccc",
    borderColor: Colors.PRIMARY_LIGHT_2,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: "Rubik_700Regular",
    color: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_LIGHT_1,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default RegisterScreen;
