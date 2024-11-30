import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import AdjuntosScreen from "../screens/AdjuntosScreen";
import RenderizadorArchivos from "../components/adjuntos/RenderizadorArchivos";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function AdjuntosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="adjuntoS"
        component={AdjuntosScreen}
        options={Header("Adjuntos")}
      />
      <Stack.Screen
        name="archivoAdjuntoS"
        component={RenderizadorArchivos}
        options={Header("Archivos Adjunto")}
      />
    </Stack.Navigator>
  );
}
