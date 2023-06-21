import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SearchPageProps } from "../utilities/types";

function ViewLeaderboardButton({ navigation }: SearchPageProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LeaderboardPage")}
      style={{
        backgroundColor: '#FFAFED',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        View Leaderboard
      </Text>
    </TouchableOpacity>
  );
}

export default React.memo(ViewLeaderboardButton);
