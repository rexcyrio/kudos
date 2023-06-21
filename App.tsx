import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { auth, db } from "./firebase";
import HomePageWrapper from "./src/pages/HomePageWrapper";
import LoginPage from "./src/pages/LoginPage";
import NotificationsPage from "./src/pages/NotificationsPage";
import ProfilePages from "./src/pages/ProfilePage/ProfilePages";
import SearchPageWrapper from "./src/pages/SearchPageWrapper";
import SettingsPage from "./src/pages/SettingsPage";
import { Person, RootStackParamList } from "./src/utilities/types";
import { AppStateContext, dummyPerson } from "./context";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const ORIGINAL_TAB_BAR_HEIGHT = 48.7;
const MARGIN_BOTTOM = 5;

function App() {
  const [person, setPerson] = useState<Person>(dummyPerson);
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    if (uid === "") {
      return;
    }
    const documentRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(documentRef, (doc) => {
      const person = {
        id: doc.id,
        ...doc.data(),
      } as Person;
      setPerson(person);
    });
    return unsubscribe;
  }, [uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AppStateContext.Provider value={person}>
      <PaperProvider>
        {user ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  switch (route.name) {
                    case "Home":
                      return (
                        <MaterialIcons name="home" size={size} color={color} />
                      );

                    case "Search":
                      return (
                        <MaterialIcons
                          name="search"
                          size={size}
                          color={color}
                        />
                      );

                    case "Profile":
                      return (
                        <MaterialIcons
                          name="person"
                          size={size}
                          color={color}
                        />
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
                        <MaterialIcons
                          name="settings"
                          size={size}
                          color={color}
                        />
                      );
                  }
                },
                tabBarActiveTintColor: "purple",
                tabBarInactiveTintColor: "gray",
                // tabBarItemStyle: { marginBottom: MARGIN_BOTTOM },
                // tabBarStyle: { height: ORIGINAL_TAB_BAR_HEIGHT + MARGIN_BOTTOM },
                // headerTitleAlign: "center",
              })}
            >
              <Tab.Screen
                name="Home"
                component={HomePageWrapper}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Search"
                component={SearchPageWrapper}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfilePages}
                options={{ headerShown: false }}
              />
              <Tab.Screen name="Notifications" component={NotificationsPage} />
              <Tab.Screen name="Settings" component={SettingsPage} />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <LoginPage setUid={setUid} />
        )}
      </PaperProvider>
    </AppStateContext.Provider>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="FirstPage">
    //     <Stack.Screen name="FirstPage" component={FirstPage} />
    //     <Stack.Screen name="SecondPage" component={SecondPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
});

export default React.memo(App);
