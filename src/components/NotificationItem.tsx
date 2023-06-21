import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type NotificationItemProps = {
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  points: number;
  index: number;
};

function NotificationItem({
  timestamp,
  points,
  index,
}: NotificationItemProps): JSX.Element {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        padding: 10,
        marginTop: index === 0 ? 10 : 0,
        marginBottom: 10,
        marginHorizontal: 5,
      }}
    >
      <View>
        <Text style={{ color: "#8A8A8A" }}>
          {convertTimestampToString(timestamp)}
        </Text>
        <Text>You earned {points} Kindness points!</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          borderRadius: 10,
          backgroundColor: "lightgray",
          paddingVertical: 3,
          paddingHorizontal: 5,
        }}
      >
        <Text>+{points}</Text>
        <MaterialCommunityIcons name="cards-heart" size={24} color="#ce00ff" />
      </View>
    </View>
  );
}

function convertTimestampToString(
  timestamp: NotificationItemProps["timestamp"]
): string {
  const date = new Date(timestamp.seconds * 1000);

  const d = date.getDate();
  const m = date.getMonth() + 1; // getMonth() is 0-indexed
  const yyyy = date.getFullYear();

  const h24 = date.getHours();
  const h12 = h24 >= 13 ? h24 - 12 : h24;
  const minutes = date.getMinutes();
  const AM_PM_string = h24 <= 11 ? "AM" : "PM";

  return `${d}/${m}/${yyyy}, ${h12}:${minutes} ${AM_PM_string}`;
}

export default React.memo(NotificationItem);
