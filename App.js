import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/AppNavigation";
import { LogBox, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/services/auth/context/AuthContext";
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
      <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor={"#179275"} />
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </>
  );
}
