import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomePage from "./HomePage";
import LeaderboardPage from "./LeaderboardPage";
import PersonProfilePage from "./PersonProfilePage";

const Stack = createNativeStackNavigator();

function HomePageWrapper() {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="LeaderboardPage" component={LeaderboardPage} />
      <Stack.Screen name="PersonProfilePage" component={PersonProfilePage} />
    </Stack.Navigator>
  );
}
``;
export default React.memo(HomePageWrapper);
