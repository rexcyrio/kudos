import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SearchPageStackParamList } from "../utilities/types";
import LeaderboardPage from "./LeaderboardPage";
import SearchPageInner from "./SearchPageInner";

const Stack = createNativeStackNavigator<SearchPageStackParamList>();

function SearchPage(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="SearchPageInner">
      <Stack.Screen name="SearchPageInner" component={SearchPageInner} />
      <Stack.Screen name="LeaderboardPage" component={LeaderboardPage} />
    </Stack.Navigator>
  );
}

export default React.memo(SearchPage);
