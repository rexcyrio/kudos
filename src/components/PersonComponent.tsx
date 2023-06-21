import React from "react";
import { Image, Text, View } from "react-native";
import { Person } from "../utilities/types";
import { mappingAvatarNameToImageSource } from "../pages/ProfilePage/MainProfilePage";

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
            uri: person.profilePicture,
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
        source={mappingAvatarNameToImageSource[person.avatar]}
        style={{
          width: 0.75 * HEIGHT,
          height: 0.75 * HEIGHT,
        }}
      />
    </View>
  );
}

export default React.memo(PersonComponent);
