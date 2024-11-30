import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndexStack from "./IndexStack";
import RutinaStack from "./RutinaStack";
import AdjuntosStack from "./AdjuntosStack";
import PerfilStack from "./PerfilStack";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../screens/SplashScreen";
import { AuthContext } from "../services/auth/context/AuthContext";

const Tab = createBottomTabNavigator();
export default function AppNavigation() {
  const { userInfo, splashLoading } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#179275",
        tabBarInactiveTintColor: "black",
        tabBarIcon: ({ color, size }) => iconos(route, color, size),
      })}
    >
      {splashLoading ? (
        <Tab.Screen name="splash" component={SplashScreen} />
      ) : userInfo.token ? (
        <>
          <Tab.Screen
            name="index"
            component={IndexStack}
            options={{ title: "Inicio" }}
            //headerColor="#179275"
          />
          <Tab.Screen
            name="rutina"
            component={RutinaStack}
            options={{ title: "Rutinas" }}
          />
          <Tab.Screen
            name="adjuntos"
            component={AdjuntosStack}
            options={{ title: "Adjuntos" }}
          />
          <Tab.Screen
            name="perfil"
            component={PerfilStack}
            options={{ title: "Perfil" }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="index"
            component={IndexStack}
            options={{ title: "Inicio" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

function iconos(route, color, size) {
  let name;
  if (route.name === "index") {
    name = "home-outline";
  }
  if (route.name === "rutina") {
    name = "run-fast";
  }
  if (route.name === "adjuntos") {
    name = "folder-image";
  }
  if (route.name === "perfil") {
    name = "account";
  }

  return (
    <Icon type="material-community" name={name} size={size} color={color} />
  );
}
