import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Loading from "../components/common/Loading";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Icon, Input } from "react-native-elements";
import {
  aumentarDiasAvance,
  getProgressByUserId,
} from "../services/progreso/progresoService";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../services/auth/context/AuthContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
export default function RutinasScreen() {
  const { userInfo } = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [rutinasData, setRutinasData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    const progreso = await getProgressByUserId(
      userInfo.user.usuario.id_usuario
    );
    const mapped = progreso.map((rutina) => {
      return {
        id: rutina.id_progreso,
        id_rutina: rutina.rutina.id_rutina,
        name: rutina.rutina.nombre_rutina,
        porcentaje_dia: rutina.porcentaje_dia,
        dias_avance: rutina.dias_avance,
        dias_meta: rutina.dias_meta,
        anotaciones: rutina.anotaciones,
      };
    });
    setRutinasData(mapped);
    setLoading(false);
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredRutinas = rutinasData.filter((rutina) =>
    rutina.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderRutina = ({ item }) => {
    const aumentarDias = () => {
      setLoading(true);
      aumentarDiasAvance(item.id, item.id_rutina).then(() => {
        if (item.dias_avance + 1 == item.dias_meta) {
          Toast.show({
            type: "success",
            position: "top",
            text1: "¡Felicidades!",
            text2: "Has completado la rutina",
            visibilityTime: 4000,
          });
        }
        fetchData();
        setLoading(false);
      });
    };
    return (
      <Card containerStyle={styles.rutinaContainer}>
        <Icon
          name="dumbbell"
          type="font-awesome-5"
          style={{ alignSelf: "flex-start" }}
        />
        <Card.Title style={styles.rutinaName}>{item.name}</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          {/* Solo dos decimales */}
          Porcentaje de avance del dia: {item.porcentaje_dia.toFixed(2)}%
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Días de avance: {item.dias_avance}/{item.dias_meta}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Anotaciones: {item.anotaciones}
        </Text>
        {item.porcentaje_dia == 100 ? (
          <Button
            title="Continuar rutina"
            icon={
              <Icon
                type="material-community"
                name="arrow-right"
                color="#fff"
                style={{ marginRight: 10 }}
              />
            }
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => aumentarDias()}
          />
        ) : null}
        <Button
          title="Ver"
          icon={
            <Icon
              type="material-community"
              name="eye"
              color="#fff"
              style={{ marginRight: 10 }}
            />
          }
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() =>
            navigation.navigate("ejerciciosS", {
              rutina: item,
              fetchData: fetchData,
            })
          }
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Input
          containerStyle={styles.searchBar}
          placeholder="Buscar rutina"
          value={searchText}
          rightIcon={
            <Icon
              name="magnify"
              type="material-community"
              style={styles.icon}
            />
          }
          onChangeText={handleSearchTextChange}
        />
      </View>
      {filteredRutinas.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={filteredRutinas}
          keyExtractor={(rutina) => rutina.id}
          renderItem={renderRutina}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.body}
        >
          <Text style={styles.noRutinasText}>
            No hay rutinas actualmente...
          </Text>
        </ScrollView>
      )}
      <Loading visible={loading} text="Cargando..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  icon: {
    color: "#c1c1c1",
  },
  rutinaContainer: {
    padding: 10,
    marginBottom: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 20,
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
  rutinaName: {
    fontSize: 16,
  },
  body: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  noRutinasText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#193c72",
  },
});
