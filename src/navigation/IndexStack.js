import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import LoginScreen from "../screens/LoginScreen";
import RecoverScreen from "../screens/RecoverScreen";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/common/Header";
const Stack = createNativeStackNavigator();


export default function IndexStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="indexS"
        component={IndexScreen}
        options={Header("Inicio")}
        
      />
      <Stack.Screen
        name="loginS"
        component={LoginScreen}
        options={Header("Iniciar Sesión")}
      />
      <Stack.Screen
        name="recoverS"
        component={RecoverScreen}
        options={Header("Recuperar Contraseña")}
      />
    </Stack.Navigator>
  );
}
