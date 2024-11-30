import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../utils/constants.js";
import { getUserData } from "../usuario/usuarioService.js";
export async function getProgressByUserId(id) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    const url = `${API_URL}/api/progreso/usuario/${id}`;
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
export async function setComplete(id_progresos, id_asignacion) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    const url = `${API_URL}/api/progreso/${id_progresos}/${id_asignacion}`;
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
export async function aumentarDiasAvance(id_progresos, id_rutina) {
  try {
    //http://localhost:8080/api/progreso/aumentar/1/1
    const userInfo = await getUserData();
    const token = userInfo.token;
    const url = `${API_URL}/api/progreso/aumentar/${id_progresos}/${id_rutina}`;
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
export async function saveNotas(id_progresos, notas) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    let currentProgress = await getProgressId(id_progresos);
    currentProgress.anotaciones = notas;
    const url = `${API_URL}/api/progreso/`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentProgress),
    };
    const response = await fetch(url, params);
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getProgressId (id_progresos){
    try {
        const userInfo = await getUserData();
        const token = userInfo.token;
        const url = `${API_URL}/api/progreso/${id_progresos}`;
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
