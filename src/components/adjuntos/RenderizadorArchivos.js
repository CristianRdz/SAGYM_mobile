import { StyleSheet, Text, View, Image, Linking } from "react-native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { Button, Card, Icon } from "react-native-elements";
import Modal from "../common/Modal";

export default function RenderizadorArchivos(props) {
  const { enlace, nombre_archivo, tipo_elemento } = props.route.params;

  // Estado para mostrar o ocultar la modal de la imagen

  // Función para abrir el enlace en el navegador predeterminado
  const handleOpenLink = () => {
    Linking.openURL(enlace);
  };

  if (tipo_elemento === "youtube") {
    // Mostrar el video de YouTube usando un componente webview
    return (
      <>
        <WebView source={{ uri: enlace }} style={{ height: 300 }} />
        <Button
          title="Abrir en el navegador"
          icon={<Icon type="material-community" name="web" color="#fff" />}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={handleOpenLink}
        />
      </>
    );
  } else if (tipo_elemento === "imagen") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {nombre_archivo}
        </Text>
        <Card>
          <Image source={{ uri: enlace }} style={{ width: 300, height: 300 }} />
        </Card>
        <Card containerStyle={{ width: "95%", borderRadius: 10 }}>
          <Text
            style={{ fontSize: 15, fontWeight: "bold", color: "#193c72" }}
            onPress={handleOpenLink}
          >
            {enlace}
          </Text>
        </Card>
        <Button
          title="Abrir en el navegador"
          icon={<Icon type="material-community" name="web" color="#fff" />}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={handleOpenLink}
        />
      </View>
    );
  } else if (tipo_elemento === "archivo" || tipo_elemento === "enlace") {
    // Abrir el archivo o enlace en el navegador predeterminado
    return (
      //abrimos el enlace en el navegador predeterminado
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {nombre_archivo}
        </Text>
        <Card containerStyle={{ width: "95%", borderRadius: 10 }}>
          <Text
            style={{ fontSize: 15, fontWeight: "bold", color: "#193c72" }}
            onPress={handleOpenLink}
          >
            {enlace}
          </Text>
        </Card>
        <Button
          title="Abrir en el navegador"
          icon={<Icon type="material-community" name="web" color="#fff" />}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={handleOpenLink}
        />
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 15,
    marginBottom: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#193c72",
    // se centra el boton
  },
});
