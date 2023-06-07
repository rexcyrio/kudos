import React from "react";
import { Button, Text, View } from "react-native";
import { SecondPageProps } from "../utilities/types";

function SecondPage({ navigation, route }: SecondPageProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Welcome to the SecondPage!</Text>
      <Text>{route.params.info}</Text>
      <Button
        title="Go to FirstPage"
        onPress={() => navigation.navigate("FirstPage")}
      />
    </View>
  );
}

export default React.memo(SecondPage);
