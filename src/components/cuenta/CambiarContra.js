import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { changePassword } from "../../services/usuario/usuarioService";
import { AuthContext } from "../../services/auth/context/AuthContext";

export default function CambiarContra(props) {
  const {logout} = useContext(AuthContext);
  const { close, setLocalLoading, fetchDataOut } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const showHidePass = () => {
    setShowPassword(!showPassword);
  };
  const showHideNewPass = () => {
    setShowNewPassword(!showNewPassword);
  };
  const showHideConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Contraseña antigua requerida"),
      newPassword: Yup.string()
        .required("Nueva contraseña requerida")
        .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Las contraseñas no coinciden"
      ),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await changePassword(
          formValue.oldPassword,
          formValue.newPassword
        );
        if (response) {
          close();
          logout();
          Toast.show({
            type: "success",
            text1: "Contraseña actualizada",
            text2: "Tu contraseña ha sido actualizada correctamente",
          });
        } else {
          close();
          Toast.show({
            type: "error",
            text1: "Error al actualizar contraseña",
            text2:
              "Ha ocurrido un error al actualizar tu contraseña, intentelo mas tarde",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error al actualizar contraseña",
          text2: "La contraseña antigua no es correcta",
        });
      }
    },
  });

  return (
    <>
    <View style={styles.header}>
          <Text style={styles.headerText}>Cambiar contraseña</Text>
        </View>
    <View style={styles.view}>
      <Input
        placeholder="Contraseña antigua"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidePass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("oldPassword", text)}
        errorMessage={formik.errors.oldPassword}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showNewPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showNewPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHideNewPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Confirmar nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showConfirmPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHideConfirmPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
        errorMessage={formik.errors.confirmPassword}
      />
      <Button
        title="Cambiar contraseña"
        icon={<Icon name="save" type="feather" size={20} color="white" style={{marginRight: 10}} /> }
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
  input: {
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#00a86b",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0%"
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
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
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    color: "#c1c1c1",
    marginRight: 10,
  },

});
