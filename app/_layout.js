import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{
        headerStyle:{
            backgroundColor:"orange",
        },
        headerTintColor:"white",
        headerTitleStyle:{
            fontWeight:"bold"
        }
    }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="notes"/>
        <Stack.Screen name="pdf"/>
    </Stack>
  )
}
