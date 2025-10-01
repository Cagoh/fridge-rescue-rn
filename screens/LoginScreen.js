import { useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { Colors } from "../styles/colors";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import AppHeader from "../components/AppHeader";
// import  AuthContext  from "../context/AuthContext";

const API_URL = "http://10.167.34.222:8080/login";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, biometricLogin } = useContext(AuthContext);
  const [error, setError] = useState("");

  const members = [
    ["rahmat", "group3"],
    ["caleb", "group3"],
    ["trisha", "group3"],
    ["indy", "group3"],
    ["guest", "group3"],
  ];

  const handleLogin = async () => {
    try {
      const loginData = {
        userName: username,
        password: password,
      };

      const response = await axios.post(API_URL, loginData);
      if (response && response.data) {
        setError("");
        login(username, password);
      }
    } catch (err) {
      setError(err.message);
    }

    // const found = members.find(
    //   (m) => m[0] === username.trim() && m[1] === password
    // );

    // if (found) {
    //   setError("");
    //   login(username, password);
    // } else {
    //   setError("Invalid username or password");
    // }
  };

  return (
    <ImageBackground
      source={require("../assets/images/wallpaper.jpg")}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.3 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // ios lifts up, android resizes height
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <AppHeader />
              <Text style={styles.title}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor={Colors.PRIMARY_LIGHT_2}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={Colors.PRIMARY_LIGHT_2}
                secureTextEntry
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.buttonsContainer}>
                <Button onPress={handleLogin}> Login</Button>
                <Button onPress={() => navigation.navigate("Register")}>
                  Register
                </Button>
              </View>
              <Text style={styles.instructionText}>Login with Biometric</Text>
              <View>
                <Ionicons
                  name="finger-print"
                  size={48}
                  color={Colors.PRIMARY}
                  onPress={biometricLogin}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
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
  instructionText: {
    marginTop: 16,
    marginBottom: 8,
    color: Colors.PRIMARY,
    fontFamily: "Rubik_400Regular",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    fontFamily: "Rubik_400Regular",
  },
});

export default LoginScreen;
