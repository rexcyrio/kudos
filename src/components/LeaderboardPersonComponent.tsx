import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Person } from "../utilities/types";
import PersonComponent from "./PersonComponent";
type LeaderboardPersonComponentProps = {
  position: number;
  person: Person;
}

function LeaderboardPersonComponent({
  position,
  person,
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
        backgroundColor: "yellow",
      }}
    >
      <Text style={{ fontSize: 16 }}>#{position}</Text>
      <PersonComponent person={person} />
    </TouchableOpacity>
  );
}

export default React.memo(LeaderboardPersonComponent);
