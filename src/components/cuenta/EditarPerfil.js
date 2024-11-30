import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { updateUser } from "../../services/usuario/usuarioService";

export default function EditarPerfil(props) {
  const { close, fetchDataOut, setLocalLoading } = props;
  let { usuario } = props;
  const formik = useFormik({
    initialValues: {
      nombre: usuario.nombre,
      apellidoPaterno: usuario.apellido_paterno,
      apellidoMaterno: usuario.apellido_materno,
      telefono: usuario.telefono,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellidoPaterno: Yup.string().required(
        "El apellido paterno es obligatorio"
      ),
      apellidoMaterno: Yup.string().required(
        "El apellido materno es obligatorio"
      ),
      telefono: Yup.string()
        .required("El teléfono es obligatorio")
        .matches(/^\d+$/, "El teléfono debe contener sólo números")
        .min(10, "El teléfono debe tener al menos 10 dígitos"),
    }),
    onSubmit: async (formData) => {
      try {
        setLocalLoading(true);
        usuario.nombre = formData.nombre;
        usuario.apellido_paterno = formData.apellidoPaterno;
        usuario.apellido_materno = formData.apellidoMaterno;
        usuario.telefono = formData.telefono;
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
      }
    },
  });
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar perfil</Text>
      </View>
      <View>
        <Input
          placeholder="Nombre"
          value={formik.values.nombre}
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name="account"
              iconStyle={styles.icon}
            />
          }
          onChangeText={(text) => formik.setFieldValue("nombre", text)}
          errorMessage={formik.errors.nombre}
        />
        <Input
          placeholder="Apellido paterno"
          value={formik.values.apellidoPaterno}
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name="account"
              iconStyle={styles.icon}
            />
          }
          onChangeText={(text) => formik.setFieldValue("apellidoPaterno", text)}
          errorMessage={formik.errors.apellidoPaterno}
        />
        <Input
          placeholder="Apellido materno"
          value={formik.values.apellidoMaterno}
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name="account"
              iconStyle={styles.icon}
            />
          }
          onChangeText={(text) => formik.setFieldValue("apellidoMaterno", text)}
          errorMessage={formik.errors.apellidoMaterno}
        />
        <Input
          placeholder="Teléfono"
          value={formik.values.telefono}
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name="phone"
              iconStyle={styles.icon}
            />
          }
          onChangeText={(text) => formik.setFieldValue("telefono", text)}
          errorMessage={formik.errors.telefono}
          keyboardType="numeric"
          maxLength={10}
        />
        <Button
          title="Guardar cambios"
          icon={<Icon name="save" type="feather" size={20} color="white" style={{marginRight: 10}} />}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
        <Button
          title="Cancelar"
          icon={<Icon name="x" type="feather" size={20} color="white" style={{marginRight: 10}} />}
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
