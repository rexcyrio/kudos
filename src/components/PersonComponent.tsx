import React from "react";
import { Image, Text, View } from "react-native";
import { Person } from "../utilities/types";

type PersonProps = {
  person: Person;
};

const HEIGHT = 80;

function PersonComponent({ person }: PersonProps): JSX.Element {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/d3/7c/33/d37c33b2921a5df2fc85040e32b28f6c.jpg",
          }}
          style={{
            width: HEIGHT,
            height: HEIGHT,
            borderRadius: HEIGHT / 2,
            marginHorizontal: 10,
          }}
        />
        <View>
          <Text style={{ fontSize: 16 }}>{person.name}</Text>
          <Text style={{ color: "gray" }}>{person.points} points</Text>
        </View>
      </View>
      <Image
        source={{
          uri: "https://i.pinimg.com/236x/1f/ba/a6/1fbaa6ee16e44a8e1f86403e0f6ac982--frogs-funny-cat-pictures.jpg",
        }}
        style={{
          width: HEIGHT / 2,
          height: HEIGHT / 2,
        }}
      />
    </View>
  );
}

export default React.memo(PersonComponent);
