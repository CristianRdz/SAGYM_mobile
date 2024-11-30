import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import OpcionesPerfil from "../components/cuenta/OpcionesPerfil";
import { getUserById } from "../services/usuario/usuarioService";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/common/Loading";
import { AuthContext } from "../services/auth/context/AuthContext";
import { RefreshControl } from "react-native-gesture-handler";

const PerfilScreen = () => {
  const { userInfo, isLoading } = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  async function fetchData() {
    const response = await getUserById(userInfo.user.usuario.id_usuario);
    setResponse(response);
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);
  const navigation = useNavigation();
  const [response, setResponse] = useState({});
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Icon name="account-circle" size={80} color="#179275" />
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfoText}>
              <Icon
                type="material-community"
                name="account"
                iconStyle={styles.icon}
              />
              {response.nombre +
                " " +
                response.apellido_paterno +
                " " +
                response.apellido_materno}
            </Text>
            <Text style={styles.profileInfoText}>
              <Icon
                type="material-community"
                name="email"
                iconStyle={styles.icon}
              />{" "}
              {response.correo}
            </Text>

            <View style={styles.fisico}>
              <Text style={styles.profileInfoText}>
                <Icon
                  type="material-community"
                  name="human-male-height"
                  iconStyle={styles.icon}
                />
                Altura (CM): {response.altura}
              </Text>
              <Text style={styles.profileInfoText}>
                <Icon
                  type="material-community"
                  name="weight-kilogram"
                  iconStyle={styles.icon}
                />
                Peso (KG) : {response.peso}
              </Text>

              <View style={styles.profileStatus}>
                <View style={styles.statusIcon} />
                <Text style={styles.statusText}>Activo</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <OpcionesPerfil
            fetchDataOut={fetchData}
            setLocalLoading={setLocalLoading}
          />
        </View>
        <View style={styles.btnContainer}></View>
        <Loading visible={isLoading} text="Cerrando sesión..." />
      </View>
      <Loading visible={localLoading} text="Actualizando datos..." />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  profileImageContainer: {
    borderRadius: 50,
    backgroundColor: "#e3e3e3",
    padding: 10,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileInfoContainer: {
    marginLeft: 20,
  },
  profileInfoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  profileStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#179275",
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    color: "#179275",
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#193c72",
    // se centra el boton
  },
});

export default PerfilScreen;
