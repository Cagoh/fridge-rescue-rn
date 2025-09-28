import { useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../styles/colors";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import AppHeader from "../components/AppHeader";
// import  AuthContext  from "../context/AuthContext";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, biometricLogin } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require("../assets/images/wallpaper.jpg")}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.3 }}
    >
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
        <View style={styles.buttonsContainer}>
          <Button onPress={() => login(username, password)}> Login</Button>
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
});

export default LoginScreen;
