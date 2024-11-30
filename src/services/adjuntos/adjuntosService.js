import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils/constants.js';
import { getUserData } from '../usuario/usuarioService.js';

export async function getAdjuntosByUserId(id) {
    try {
        const userInfo = await getUserData();
        const token = userInfo.token;
        const url = `${API_URL}/api/adjunto/usuario/${id}`;
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
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