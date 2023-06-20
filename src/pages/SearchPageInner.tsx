import React from "react";
import { Text, View } from "react-native";
import ViewLeaderboardButton from "../components/ViewLeaderboardButton";
import { nestedViewStyles } from "../utilities/css";
import { SearchPageProps } from "../utilities/types";

function SearchPageInner({ navigation, route }: SearchPageProps) {
  return (
    <View style={nestedViewStyles.outerView}>
      <View style={nestedViewStyles.innerView}>
        <ViewLeaderboardButton navigation={navigation} route={route} />
        <Text>This is the inner search page</Text>
      </View>
    </View>
  );
}

export default React.memo(SearchPageInner);
