import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import { Portal8 } from "../constants/Portal8"
import { useState } from "react";
import Portal8Navigator from "./modules/navigator";

const Stack = createNativeStackNavigator();

export default function App(){
  const [portal8, setPortal8] = useState(Portal8)

  return (
    <Stack.Navigator>
      <Stack.Screen name="index">
        {(e) => <Index {...e}/>}
      </Stack.Screen>
      <Stack.Screen name="home">
        {(e)=> <Portal8Navigator {...e} portal8={portal8} setPortal8={setPortal8}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
}