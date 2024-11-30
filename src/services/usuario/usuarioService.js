import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../utils/constants.js";
import { login } from "../auth/auth.js";
export async function getUserData() {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
//token
export async function getUserById(id) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    const url = `${API_URL}/api/usuario/${id}`;
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

export async function updateUser(user) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    const url = `${API_URL}/api/usuario/`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
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
export async function changePassword(password, newPassword) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    const correo = userInfo.user.usuario.correo;
    let user = await getUserById(userInfo.user.usuario.id_usuario);
    const verified = await login(correo, password);
    if (verified) {
      user.contrasena = newPassword;
      const url = `${API_URL}/api/usuario/pass/`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (result.data) {
        return result.data;
      }
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
