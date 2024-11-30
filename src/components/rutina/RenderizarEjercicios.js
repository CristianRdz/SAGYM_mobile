import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import Modal from "../common/Modal";
import HacerEjercicio from "./HacerEjercicio";
import { getEjerciciosAsignados } from "../../services/rutina/RutinaService";
import { map } from "lodash";
import Loading from "../common/Loading";
import { setComplete } from "../../services/progreso/progresoService";

export default function RenderizarEjercicios(props) {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const { params } = props.route;
  const actualizarAfuera = props.route.params.fetchData;
  //  {"anotaciones": "webos", "dias_avance": 15, "dias_meta": 15, "id": 1, "id_rutina": 1, "name": "piernas", "porcentaje_dia": 100}
  const {
    anotaciones,
    dias_avance,
    dias_meta,
    id,
    id_rutina,
    name,
    porcentaje_dia,
  } = params.rutina;
  async function fetchData() {
    const ejerciciosAsignados = await getEjerciciosAsignados(id_rutina);
    setEjercicios(ejerciciosAsignados);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const openClose = () => setShowModal((prevState) => !prevState);

  const RenderizarEjercicio = (props) => {
    const { ejercicio } = props;
    const [isVisible, setIsVisible] = useState(true);
    const completarEjercicio = () => {
      setRenderComponent(
        <HacerEjercicio
          id_progreso={id}
          ejercicio={ejercicio}
          setComplete={setComplete}
          fetchData={fetchData}
          openClose={openClose}
          setLocalLoading={setLocalLoading}
        />
      );
      openClose();
    };
    return isVisible ? (
      <Card key={ejercicio.id_asignacion} containerStyle={styles.card}>
        <Card.Title style={styles.title}>
          {ejercicio.ejercicio.nombre}
        </Card.Title>
        <Card.Divider />
        <Text style={styles.datosEjercicio}>
          <Icon type="material-community" name="comment-text" />
          Descripción:
        </Text>
        <TextInput
          style={styles.containDescription}
          multiline={true}
          numberOfLines={4}
          editable={false}
          value={ejercicio.ejercicio.descripcion}
        />
        <Text style={styles.datosEjercicio}>
          <Icon type="material-community" name="repeat" />
          Repeticiones: {ejercicio.repeticiones}
        </Text>
        {ejercicio.peso !== null ? (
          <Text style={styles.datosEjercicio}>
            <Icon type="material-community" name="weight" />
            Peso: {ejercicio.peso}
          </Text>
        ) : null}
        <Button
          title="Iniciar ejercicio"
          onPress={completarEjercicio}
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          icon={{
            name: "play",
            size: 15,
            color: "white",
            style: styles.icon,
            type: "material-community",
          }}
        />
      </Card>
    ) : null;
  };

  const finalizarAvance = () => {
    setLocalLoading(true);
    actualizarAfuera().then(() => {
      setLocalLoading(false);
      navigation.goBack();
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.cardContainer}>
        {map(ejercicios, (ejercicio) => (
          <RenderizarEjercicio
            key={ejercicio.id_asignacion}
            ejercicio={ejercicio}
            id_rutina={id_rutina}
          />
        ))}
      </ScrollView>
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Finalizar avance de rutina"
          onPress={finalizarAvance}
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          icon={{
            name: "check",
            size: 15,
            color: "white",
            style: styles.icon,
          }}
        />
      </View>
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
      <Loading visible={localLoading} text="Cargando..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingBottom: 20, // nuevo
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginLeft: 10,
    marginRight: 30, // nuevo
    width: 300,
    elevation: 5,
    maxHeight: 400, // nuevo
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containDescription: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    marginTop: 10,
    height: 120,
    textAlignVertical: "top",
  },
  datosEjercicio: {
    fontSize: 14,
    color: "#000",
  },
  icon: {
    color: "#c1c1c1",
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
