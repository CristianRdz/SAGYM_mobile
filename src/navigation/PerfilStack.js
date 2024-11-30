import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilScreen from "../screens/PerfilScreen";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function IndexStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="perfilS"
        component={PerfilScreen}
        options={Header("Perfil")}
      />
    </Stack.Navigator>
  );
}