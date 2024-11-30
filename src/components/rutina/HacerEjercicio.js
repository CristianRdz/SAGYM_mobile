import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";

export default function HacerEjercicio(props) {
  const {
    ejercicio,
    fetchData,
    openClose,
    setLocalLoading,
    setComplete,
    id_progreso,
  } = props;
  const repeticiones = parseInt(ejercicio.repeticiones);
  const [contador, setContador] = useState(10);
  const [repeticionesRestantes, setRepeticionesRestantes] =
    useState(repeticiones);
  const [mostrarContador, setMostrarContador] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setContador((contador) => {
        if (contador > 0) {
          return contador - 1;
        } else {
          setMostrarContador(false);
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [repeticionesRestantes]);

  const progreso = ((10 - contador) / 10) * 100;

  if (repeticionesRestantes > 0) {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerText}>{ejercicio.ejercicio.nombre}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.repeticiones}>
            <Icon type="material-community" name="repeat" />
            Repeticiones: {repeticiones - repeticionesRestantes}/{repeticiones}
          </Text>
          {ejercicio.peso !== null ? (
            <Text style={styles.repeticiones}>
              <Icon type="material-community" name="weight" />
              Peso: {ejercicio.peso}
            </Text>
          ) : null}
          {mostrarContador ? (
            <>
              <Text style={styles.tiempo}>Segundos restantes: {contador}</Text>
              <View style={styles.barra}>
                <View style={[styles.progreso, { width: `${progreso}%` }]} />
              </View>
            </>
          ) : (
            <Button
              title="Siguiente repeticion"
              icon={{
                type: "material-community",
                name: "arrow-right",
                color: "#fff",
              }}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              onPress={() => {
                setRepeticionesRestantes(
                  (repeticionesRestantes) => repeticionesRestantes - 1
                );
                setContador(10);
                setMostrarContador(true);
              }}
            />
          )}
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerText}>{ejercicio.ejercicio.nombre}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.tiempo}>Terminaste el ejercicio</Text>
          <Button
            title="Terminar ejercicio"
            icon={{
              type: "material-community",
              name: "check",
              color: "#fff",
            }}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => {
              setLocalLoading(true);
              setComplete(id_progreso, ejercicio.id_asignacion).then(() => {
                fetchData().then(() => {
                  openClose();
                  setLocalLoading(false);
                });
              });
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#00a86b",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0%",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 20,
    marginBottom: 20,
  },
  repeticiones: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  tiempo: {
    fontSize: 17,
    marginBottom: 20,
    color: "#00a86b",
    fontWeight: "bold",
  },
  barra: {
    width: 200,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  progreso: {
    height: "100%",
    // verde utez
    backgroundColor: "#00a86b",
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
  btnCancelar: {
    // Color danger de bootstrap
    backgroundColor: "#dc3545",
  },
});
