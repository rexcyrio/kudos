import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FirstPage from "./src/pages/FirstPage";
import SecondPage from "./src/pages/SecondPage";
import { RootStackParamList } from "./src/utilities/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default React.memo(App);
