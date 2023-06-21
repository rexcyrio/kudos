import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Person, SearchPageStackParamList } from "../utilities/types";
import PersonComponent from "./PersonComponent";

type LeaderboardPersonComponentProps = {
  position: number;
  person: Person;
  navigation: NativeStackNavigationProp<
    SearchPageStackParamList,
    "LeaderboardPage",
    undefined
  >;
};

function LeaderboardPersonComponent({
  position,
  person,
  navigation,
}: LeaderboardPersonComponentProps): JSX.Element {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: position === 1 ? 10 : 0,
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#FFDCF8",
      }}
      onPress={() =>
        navigation.navigate("PersonProfilePage", { id: person.id })
      }
    >
      <Text style={{ fontSize: 16 }}>#{position}</Text>
      <PersonComponent person={person} />
    </TouchableOpacity>
  );
}

export default React.memo(LeaderboardPersonComponent);
