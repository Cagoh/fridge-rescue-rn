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
import axios from "axios";

const API_URL = "http://10.167.34.222:8080/register";

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const loginData = {
        userName: username,
        password: password,
      };

      const response = await axios.post(API_URL, loginData);
      if (response && response.data) {
        setError("");
        navigation.navigate("Login");
      }
    } catch (err) {
      setError(err.message);
    }
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  errorText: {
    color: "red",
    marginBottom: 8,
    fontFamily: "Rubik_400Regular",
  },
});

export default RegisterScreen;
