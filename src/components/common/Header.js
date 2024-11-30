import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
export default function Header(title) {
const navigation = useNavigation();
  return {
    title: title,
    headerStyle: {
      // verde utez
      backgroundColor: '#179275',
    },
    // color iconos barra de estado
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight:
      // icono de menu
      () => (
        <Image
        source={require('../../../assets/img/logo.png')}
        style={{ width: 30, height: 30, marginHorizontal: 10 }}
        onPress={() => navigation.navigate('indexS')}
      />
      ),
  }
}
