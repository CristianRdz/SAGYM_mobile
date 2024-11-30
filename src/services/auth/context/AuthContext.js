import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { API_URL } from "../../../utils/constants";
import { set } from "lodash";
import { Toast } from "react-native-toast-message/lib/src/Toast";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/api/auth/login/`, {
        correo: email,
        contrasena: password,
      })
      .then((res) => {
        const rol = res.data.data.user.usuario.rol.id_rol;
        if (rol === 3) {
          let userInfo = res.data.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setIsLoading(false);
          Toast.show({
            type: "success",
            position: "top",
            text1: "Bienvenido",
            text2: "Has iniciado sesión correctamente",
          });
        }else{
          setIsLoading(false);
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error al iniciar sesión",
            text2: "No tienes permisos para iniciar sesión",
          });
        }
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al iniciar sesión",
          text2: "Ha ocurrido un error al iniciar sesión, intentelo mas tarde",
        });
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
    setUserInfo({});
    setIsLoading(false);
    Toast.show({
      type: "success",
      position: "top",
      text1: "Sesión cerrada",
      text2: "Has cerrado sesión correctamente",
    });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
