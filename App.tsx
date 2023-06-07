import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FirstPage from "./src/pages/FirstPage";
import SecondPage from "./src/pages/SecondPage";
import { RootStackParamList } from "./src/utilities/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import PageWithPaper from "./src/pages/PageWithPaper";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "FirstPage":
                return <MaterialIcons name="home" size={size} color={color} />;
              case "SecondPage":
                return (
                  <MaterialIcons name="settings" size={size} color={color} />
                );
              default:
                return <MaterialIcons name="list" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="FirstPage" component={FirstPage} />
        <Tab.Screen name="SecondPage" component={SecondPage} />
        <Tab.Screen name="PageWithPaper" component={PageWithPaper} />
      </Tab.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="FirstPage">
    //     <Stack.Screen name="FirstPage" component={FirstPage} />
    //     <Stack.Screen name="SecondPage" component={SecondPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default React.memo(App);
