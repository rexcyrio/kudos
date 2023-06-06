import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { FirstPageProps } from "../utilities/types";

function FirstPage({ navigation }: FirstPageProps) {
  return (
    <View style={styles.container}>
      <Text>This is the FirstPage</Text>
      <Button
        title="Go to SecondPage"
        onPress={() => navigation.navigate("SecondPage")}
      />
      <MaterialIcons name="settings" size={24} color="black" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(FirstPage);
