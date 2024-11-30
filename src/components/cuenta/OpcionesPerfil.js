import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import CambiarContra from "./CambiarContra";
import EditarPerfil from "./EditarPerfil";
import EditarFisico from "./EditarFisico";
import { getUserById } from "../../services/usuario/usuarioService";
import { logout } from "../../services/auth/auth";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../services/auth/context/AuthContext";
import Loading from "../common/Loading";

export default function OpcionesPerfil(props) {
  const navigation = useNavigation();
  const { fetchDataOut, setLocalLoading } = props;
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const [response, setResponse] = useState({});
  async function fetchData() {
    const response = await getUserById(userInfo.user.usuario.id_usuario);
    setResponse(response);
  }
  useEffect(() => { 
    fetchData();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const openClose = () => setShowModal((prevState) => !prevState);
  const selectComponent = (word) => {
    switch (word) {
      case "contra":
        setRenderComponent(
          <CambiarContra close={openClose} usuario={response} fetchDataOut={fetchDataOut} setLocalLoading={setLocalLoading}  />
        );
        break;
      case "perfil":
        setRenderComponent(
          <EditarPerfil close={openClose} usuario={response} fetchDataOut={fetchDataOut} setLocalLoading={setLocalLoading}  />
        );
        break;
      case "fisico":
        setRenderComponent(
          <EditarFisico close={openClose} usuario={response} fetchDataOut={fetchDataOut} setLocalLoading={setLocalLoading}  />
        );
        break;
      default:
        setRenderComponent(<Text>default</Text>);
        break;
    }
    openClose();
  };
  const optionsMenu = getOptionsMenu(selectComponent);
  return (
    <View>
      {map(optionsMenu, (menu, index) => (
        <ListItem key={index} onPress={menu.onPress}>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <Modal isVisible={showModal} close={openClose}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function getOptionsMenu(selectComponent) {
  const {logout} = useContext(AuthContext);
  return [
    {
      title: "Editar perfil",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#000000",
      iconColorRight: "#000000",
      iconNameRight: "chevron-right",
      onPress: () => selectComponent("perfil"),
    },
    {
      title: "Editar físico",
      iconType: "material-community",
      iconNameLeft: "human",
      iconColorLeft: "#000000",
      iconColorRight: "#000000",
      iconNameRight: "chevron-right",
      onPress: () => selectComponent("fisico"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#000000",
      iconColorRight: "#000000",
      iconNameRight: "chevron-right",
      onPress: () => selectComponent("contra"),
    },
    {
      title: "Cerrar sesión",
      iconType: "material-community",
      iconNameLeft: "logout",
      iconColorLeft: "#000000",
      iconColorRight: "#000000",
      iconNameRight: "chevron-right",
      onPress: () => {
        logout();
      },
    },
  ];
}
