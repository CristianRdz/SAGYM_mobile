import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    View,
  } from "react-native";
import { Button, Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { getPesoRutina } from "../../services/progreso/progresoService";
import { saveNotas } from "../../services/progreso/progresoService";

export default function Rutina(props) {
  const { data } = props;
  const { setLocalLoading, localLoading } = props;
  const {
    rutina,
    id_progreso,
    progreso_dia,
    meta_dia,
    dias_meta,
    dias_avance,
    porcentaje_dia,
    anotaciones,
  } = data;

  const [progresoDia, setprogresoDia] = useState(0);
  const [meta, setmeta] = useState(0);
  const [diasmeta, setdiasmeta] = useState(0);
  const [diasProgreso, setdiasProgreso] = useState(0);
  const [exercisePorcentaje, setExercisePorcentaje] = useState(0);
  const [notas, setnotas] = useState("");
  const [idProgresos, setIdProgresos] = useState(0);
  const [rutinaAct, setrutinaAct] = useState({});
  const [peso, setPeso] = useState(0);
  async function getPeso() {
    const peso = await getPesoRutina(rutina.id_rutina);
    setPeso(peso);
  }

  useEffect(() => {
    getPeso();
    setrutinaAct(rutina);
    setprogresoDia(progreso_dia);
    setmeta(meta_dia);
    setdiasmeta(dias_meta);
    setdiasProgreso(dias_avance);
    setExercisePorcentaje(porcentaje_dia);
    setnotas(anotaciones);
    setIdProgresos(id_progreso);
  }, []);
  const handleSave = () => {
    setLocalLoading(true);
    setnotas(notas);
    saveNotas(idProgresos, notas).then(() => {
      obtenerRutinas().then(() => setLocalLoading(false));
    });
  };
  let porcentajeTotal = (diasProgreso / diasmeta) * 100;
  porcentajeTotal = porcentajeTotal.toFixed(2);
  return (
    <View style={styles.body}>
      <View style={styles.metaContainer}>
        <Text style={styles.rutinaNombre}>{rutinaAct.nombre_rutina}</Text>
        <Text style={styles.metaTitle}>Progreso del día:</Text>
        <View style={styles.progresoDiaContainer}>
          <Text style={styles.progresoDiaText}>{progresoDia}</Text>
          <Text style={styles.progresoDiaSubText}>Repeticiones</Text>
        </View>
        <Text style={styles.metaTitle}>
          {porcentajeTotal}% completado de la rutina
        </Text>
        <View style={styles.metaProgreso}>
          <View
            style={[
              styles.ProgresoBar,
              { width: `${(diasProgreso / diasmeta) * 100}%` },
            ]}
          ></View>
        </View>
        <View style={styles.metaDetails}>
          <Text style={styles.metaText}>{meta}</Text>
          <Text style={styles.metaSubText}>Meta dia</Text>
          <Text style={styles.metaText}>{diasProgreso}</Text>
          <Text style={styles.metaSubText}>Días de avance</Text>
          <Text style={styles.metaText}>{diasmeta}</Text>
          <Text style={styles.metaSubText}>Días de meta</Text>
        </View>
      </View>
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Ejercicios del día</Text>
        <View style={styles.exerciseProgreso}>
          <View
            style={[styles.ProgresoBar, { width: `${exercisePorcentaje}%` }]}
          ></View>
        </View>
        <Text style={styles.exercisePorcentaje}>
          {exercisePorcentaje.toFixed(2)}% completado
        </Text>
      </View>
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>Peso restante de la rutina</Text>
        <Text style={styles.exercisePorcentaje}>{peso} kg</Text>
      </View>
      <View style={styles.notasContainer}>
        <Text style={styles.notasTitle}>Anotaciones</Text>
        <TextInput
          style={styles.notasInput}
          placeholder="Escriba sus anotaciones aquí"
          multiline
          value={notas}
          onChangeText={(text) => setnotas(text)}
        />
        <Button
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          icon={
            <Icon
              name="save"
              type="feather"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          title="Guardar"
          onPress={handleSave}
          loading={localLoading}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: "#179275",
      paddingTop: 50,
      paddingBottom: 16,
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    headerText: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "bold",
    },
    body: {
      paddingHorizontal: 24,
    },
    progresoDiaContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      paddingVertical: 32,
    },
    progresoDiaText: {
      fontSize: 32,
      fontWeight: "bold",
      marginRight: 16,
    },
    progresoDiaSubText: {
      fontSize: 18,
      color: "#A7A7A7",
    },
    metaContainer: {
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      paddingVertical: 24,
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    metaTitle: {
      fontSize: 17,
      fontWeight: "bold",
      marginBottom: 16,
      marginTop: 4,
    },
    metaProgreso: {
      height: 10,
      borderRadius: 4,
      backgroundColor: "#D8D8D8",
      marginBottom: 8,
    },
    ProgresoBar: {
      height: 10,
      borderRadius: 4,
      backgroundColor: "#193c72",
    },
    metaDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    metaText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    metaSubText: {
      fontSize: 14,
      color: "#A7A7A7",
    },
    exerciseContainer: {
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      paddingVertical: 24,
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    exerciseTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
    },
    exerciseProgreso: {
      height: 10,
      borderRadius: 4,
      backgroundColor: "#D8D8D8",
      marginBottom: 8,
    },
    exercisePorcentaje: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 8,
      color: "#A7A7A7",
    },
    notasContainer: {
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      paddingVertical: 24,
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    notasTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
    },
    notasInput: {
      backgroundColor: "#f7f7f7",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      height: 120,
      textAlignVertical: "top",
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
    rutinaNombre: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#193c72",
    },
  });
