import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SearchPageStackParamList } from "../utilities/types";
import LeaderboardPage from "./LeaderboardPage";
import PersonProfilePage from "./PersonProfilePage";
import SearchPage from "./SearchPage";

const Stack = createNativeStackNavigator<SearchPageStackParamList>();

function SearchPageWrapper(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="SearchPage">
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="LeaderboardPage" component={LeaderboardPage} />
      <Stack.Screen name="PersonProfilePage" component={PersonProfilePage} />
    </Stack.Navigator>
  );
}

export default React.memo(SearchPageWrapper);
