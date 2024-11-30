import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../components/cuenta/LoginForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <Image source={require("../../assets/img/logo.png")} style={styles.logo} />
      <View>
        <LoginForm />
      </View>
      <Text style={styles.registerLink} onPress={() => { navigation.navigate("recoverS") }}>¿Olvidaste tu contraseña?</Text>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 150,
    marginTop: 30,
  },
  registerLink: {
    textAlign: "center",
    marginTop: 10,
    color: "#179275",
    fontSize: 16,
},
});
