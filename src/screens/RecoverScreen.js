import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import RecoverForm from "../components/cuenta/RecoverForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function RecoverScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require("../../assets/img/logo.png")} style={styles.logo} />
      <View>
        <RecoverForm/>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: "contain",
        width: "100%",
        height: 150,
        marginTop: 30,
      },

});