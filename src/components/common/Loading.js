import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Loading(props) {
    // Estilo propio el del profesor es diferente pero se ve bien
    const { visible, text } = props
  return (
    <Overlay
        isVisible={visible}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="transparent"
        animationType="slide"
        overlayStyle={styles.overlay}
    >
        <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        <Text style={styles.text}>{text}</Text>
        </View>
    </Overlay>
    )
}

Loading.defaultProps = {
    visible: false,
    text: ""
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#00a680",
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#00a680",
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})
