import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if user is already authenticated
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (username, password) => {
    // Call your api /login
    // return a JWT + refresh token
    // Save your token to Secure Storage / Async Storage
    await AsyncStorage.setItem("token", "dummy-token");
    setIsAuthenticated(true);
  };

  const logout = async () => {
    // clear token
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const biometricLogin = async() => {
    // Check if the device supports biometric authentication
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    // Check if user has enrolled biometric authentication
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if(!hasHardware || !isEnrolled) {
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Biometrics"
    })

    if(result.success) {
      // Retrieve refresh token from AsyncStorage/SecureStore
      // Call api /refresh to get a new JWT
      // Save the new access token

      setIsAuthenticated(true);
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, biometricLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
