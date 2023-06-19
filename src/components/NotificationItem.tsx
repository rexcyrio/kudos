import React from "react";
import { Text, View } from "react-native";

type NotificationItemProps = {
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  points: number;
};

function NotificationItem({
  timestamp,
  points,
}: NotificationItemProps): JSX.Element {
  return (
    <View>
      <Text>{new Date(timestamp.seconds * 1000).toString()}</Text>
      <Text>{points}points</Text>
    </View>
  );
}

export default React.memo(NotificationItem);
