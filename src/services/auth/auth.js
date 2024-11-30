import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils/constants.js';

//http://localhost:8080/api/auth/login/

export async function login(email, password) {
    try {
        const url = `${API_URL}/api/auth/login/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo: email, contrasena: password })
        };

        const response = await fetch(url, params);
        const result = await response.json();
        //solo los usuarios con el rol 3 (gimnasio) pueden acceder a la app
        if (result.data.user.usuario.rol.id_rol === 3) {
            await AsyncStorage.setItem("token", result.data.token);
            await AsyncStorage.setItem("id_usuario", result.data.user.usuario.id_usuario.toString());
            await AsyncStorage.setItem("rol", result.data.user.usuario.rol.nombre_rol);
            await AsyncStorage.setItem("isAuth", "true");
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export async function logout() 
{
    try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("id_usuario");
        await AsyncStorage.removeItem("rol");
        await AsyncStorage.removeItem("isAuth");
        await AsyncStorage.setItem("isAuth", "false");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getToken() {
    try {
        const token = await AsyncStorage.getItem("token");
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function isAuth() {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getRol() {
    try {
        const rol = await AsyncStorage.getItem("rol");
        return rol;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//emularemos la funcion onauthstatechanged de firebase
export async function onAuthStateChanged(setUser) {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            setUser(true);
        } else {
            setUser(false);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function recoverPassword(email) {
    try {
        const url = `${API_URL}/api/auth/reset-password/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo: email })
        };

        const response = await fetch(url, params);
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}