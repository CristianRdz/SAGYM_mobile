import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Icon, Image, Input } from "react-native-elements";
import { getAdjuntosByUserId } from "../services/adjuntos/adjuntosService";
import { AuthContext } from "../services/auth/context/AuthContext";
import { useContext } from "react";

export default function AdjuntosScreen() {
  const { userInfo } = useContext(AuthContext);
  const [AdjuntosData, setAdjuntosData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  async function fetchData() {
    setLoading(true);
    const response = await getAdjuntosByUserId(
      userInfo.user.usuario.id_usuario
    );
    if (response) {
      response.map((adjunto) => {
        return {
          id_elemento: adjunto.id_elemento,
          nombre_archivo: adjunto.nombre_archivo,
          enlace: adjunto.enlace,
          tipo_elemento: adjunto.tipo_elemento,
        };
      });
      setAdjuntosData(response);
    } else {
      setError("Error al cargar los adjuntos");
    }
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

  const filteredAdjuntos = AdjuntosData.filter((adjunto) =>
    adjunto.nombre_archivo.toLowerCase().includes(searchText.toLowerCase())
  );

  const getThumbnailUrl = (enlace) => {
    //https://youtu.be/BGTZuVKTu8U or https://www.youtube.com/watch?v=BGTZuVKTu8U or https://www.youtube.com/watch?v=BGTZuVKTu8U&feature=youtu.be
    let videoId = "";
    if (enlace.includes("youtu.be")) {
      videoId = enlace.split("youtu.be/")[1];
    } else if (enlace.includes("youtube.com")) {
      videoId = enlace.split("=")[1];
    } else {
      //https://www.youtube.com/watch?v=BGTZuVKTu8U&feature=youtu.be
      videoId = enlace.split("&")[0];
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const renderadjunto = ({ item }) => {
    return (
      <Card containerStyle={styles.adjuntoContainer}>
        {/* segun el tipo de adjunto se muestra un icono u otro imagen,archivo,enlace,video de youtube y si su tipo es diferente de estos se pone icono enlace */}
        {item.tipo_elemento === "imagen" ? (
          <View>
            <Icon
              name="image"
              type="font-awesome-5"
              style={{ alignSelf: "flex-start" }}
            />
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.enlace }} style={styles.image} />
            </View>
          </View>
        ) : item.tipo_elemento === "archivo" ? (
          <Icon
            name="file"
            type="font-awesome-5"
            style={{ alignSelf: "flex-start" }}
          />
        ) : item.tipo_elemento === "enlace" ? (
          <Icon
            name="link"
            type="font-awesome-5"
            style={{ alignSelf: "flex-start" }}
          />
        ) : item.tipo_elemento === "youtube" ? (
          <View>
            <Icon
              name="youtube"
              type="font-awesome-5"
              style={{ alignSelf: "flex-start" }}
            />
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getThumbnailUrl(item.enlace) }}
                style={styles.image}
              />
            </View>
          </View>
        ) : (
          <Icon
            name="link"
            type="font-awesome-5"
            style={{ alignSelf: "flex-start" }}
          />
        )}
        <Card.Title style={styles.adjuntoName}>
          {item.nombre_archivo}
        </Card.Title>
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
          onPress={() => navigation.navigate("archivoAdjuntoS", item)}
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Input
          containerStyle={styles.searchBar}
          placeholder="Buscar adjunto"
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
      {filteredAdjuntos.length > 0 ? (
        <FlatList
          style={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={filteredAdjuntos}
          keyExtractor={(adjunto) => adjunto.id_elemento.toString()}
          renderItem={renderadjunto}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.body}
        >
          <Text style={styles.noAdjuntosText}>
            No hay adjuntos para mostrar
          </Text>
        </ScrollView>
      )}
      <Loading visible={loading} text="Cargando adjuntos..." />
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
  adjuntoContainer: {
    padding: 10,
    marginBottom: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 20,
  },
  adjuntoName: {
    fontSize: 16,
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
  imageContainer: {
    marginTop: 10,
    height: 100,
    marginBottom: 10,
    width: "95%",
    alignSelf: "center",
  },
  image: {
    marginHorizontal: "25%",
    borderRadius: 10,
    width: "50%",
    height: "100%",
  },
  body: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  noAdjuntosText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#193c72",
  },
});
