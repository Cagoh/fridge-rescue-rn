import { useContext } from "react";
import { ActivityIndicator } from "react-native";

import { StatusBar } from "expo-status-bar";
import {
  Rubik_400Regular,
  Rubik_700Bold,
  useFonts,
} from "@expo-google-fonts/rubik";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./navigation/TabNavigator";
import AuthStackNavigator from "./navigation/AuthStackNavigator";
import { Colors } from "./styles/colors";
import { AuthContext, AuthProvider } from "./context/AuthContext";

function NavigationApp() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <TabNavigator /> : <AuthStackNavigator />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  if (!fontsLoaded)
    return <ActivityIndicator size="large" color={Colors.PRIMARY} />;

  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationApp />
      </NavigationContainer>
      <StatusBar style="dark" />
    </AuthProvider>
  );
}
