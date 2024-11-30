import { StyleSheet, Text, View, InputText } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { updateUser } from "../../services/usuario/usuarioService";

export default function EditarFisico(props) {
  const { close, fetchDataOut, setLocalLoading } = props;
  let { usuario } = props;
  let pesoAct = usuario.peso.toString();
  let alturaAct = usuario.altura.toString();
  const formik = useFormik({
    initialValues: {
      peso: pesoAct,
      altura: alturaAct,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      peso: Yup.string().required("El peso es obligatorio"),
      altura: Yup.string().required("La altura es obligatoria"),
    }),
    onSubmit: async (formData) => {
      try {
        setLocalLoading(true);
        // parsear datos
        formData.peso = parseInt(formData.peso);
        formData.altura = parseInt(formData.altura);
        // actualizar datos
        usuario.peso = formData.peso;
        usuario.altura = formData.altura;
        const response = await updateUser(usuario);
        if (response.status != 500) {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Perfil actualizado",
            text2: "Tu perfil ha sido actualizado correctamente",
          });
          close();
          fetchDataOut();
          setLocalLoading(false);
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error al actualizar perfil",
            text2:
              "Ha ocurrido un error al actualizar tu perfil, intentelo mas tarde",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al actualizar perfil",
          text2:
            "Ha ocurrido un error al actualizar tu perfil, intentelo mas tarde",
        });
        setLocalLoading(false);
      }
    },
  });
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar datos físicos</Text>
      </View>

      <View>
        <Input
          placeholder="Altura (cm)"
          keyboardType="numeric"
          value={formik.values.altura}
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name="human-male-height"
              iconStyle={styles.icon}
            />
          }
          onChangeText={(text) => formik.setFieldValue("altura", text)}
          errorMessage={formik.errors.altura}
        />
        <Input
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={formik.values.peso}
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name="weight-kilogram"
              iconStyle={styles.icon}
            />
          }
          onChangeText={(text) => formik.setFieldValue("peso", text)}
          errorMessage={formik.errors.peso}
        />
        <Button
          title="Guardar cambios"
          icon={
            <Icon
              name="save"
              type="feather"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
        <Button
          title="Cancelar"
          icon={
            <Icon
              name="x"
              type="feather"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnCancelar}
          onPress={close}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    //tarjeta verde redonda
    backgroundColor: "#179275",
    borderRadius: 10,
    width: "95%",
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

  divider: {
    backgroundColor: "#179275",
    margin: 40,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
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
});
