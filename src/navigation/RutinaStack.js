import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RutinasScreen from '../screens/RutinasScreen'
import RenderizarEjercicios from '../components/rutina/RenderizarEjercicios'
import Header from '../components/common/Header'

const Stack = createNativeStackNavigator()
export default function RutinaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="rutinaS"
        component={RutinasScreen}
        options={Header('Rutinas')}
      />
      <Stack.Screen
        name="ejerciciosS"
        component={RenderizarEjercicios}
        options={Header('Ejercicios')}
      />
    </Stack.Navigator>
  )
}