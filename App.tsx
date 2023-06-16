import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomePage from "./src/pages/HomePage";
import NotificationsPage from "./src/pages/NotificationsPage";
import ProfilePage from "./src/pages/ProfilePage";
import SearchPage from "./src/pages/SearchPage";
import SettingsPage from "./src/pages/SettingsPage";
import { RootStackParamList } from "./src/utilities/types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const ORIGINAL_TAB_BAR_HEIGHT = 48.7;
const MARGIN_BOTTOM = 5;

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "Home":
                return <MaterialIcons name="home" size={size} color={color} />;

              case "Search":
                return (
                  <MaterialIcons name="search" size={size} color={color} />
                );

              case "Profile":
                return (
                  <MaterialIcons name="person" size={size} color={color} />
                );

              case "Notifications":
                return (
                  <MaterialIcons
                    name="notifications"
                    size={size}
                    color={color}
                  />
                );

              case "Settings":
                return (
                  <MaterialIcons name="settings" size={size} color={color} />
                );
            }
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray",
          tabBarItemStyle: { marginBottom: MARGIN_BOTTOM },
          tabBarStyle: { height: ORIGINAL_TAB_BAR_HEIGHT + MARGIN_BOTTOM },
          headerTitleAlign: "center",
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
        <Tab.Screen name="Notifications" component={NotificationsPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
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
