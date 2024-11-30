import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../utils/constants.js";
import { login } from "../auth/auth.js";
import { getUserData } from "../usuario/usuarioService.js";

export const getEjerciciosAsignados = async (id_rutina) => {
    try {
        const userInfo = await getUserData();
        const token = userInfo.token;
        const url = `${API_URL}/api/ejer_asig/rutina/${id_rutina}`;
        const params = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        if (result.data) {
          return result.data;
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
export const getPesoRutina = async (id_rutina) => {
    try {
        const ejercicios = await getEjerciciosAsignados(id_rutina);
        let peso = 0;
        ejercicios.forEach((ejercicio) => {
          if(ejercicio.peso!=null){
            peso += ejercicio.peso;
          }
        });
        return peso;
      } catch (error) {
        console.log(error);
        return null;
      }
    }