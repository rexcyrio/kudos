import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SearchPageProps } from "../utilities/types";

function ViewLeaderboardButton({ navigation }: SearchPageProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LeaderboardPage")}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 5,
        backgroundColor: "pink",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          marginLeft: 10,
        }}
      >
        View Leaderboard
      </Text>
      <MaterialIcons name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );
}

export default React.memo(ViewLeaderboardButton);
