import { doc, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { AppStateContext } from "../../../App";
import { db } from "../../../firebase";
import { styles } from "./MainProfilePageStyles";
import { Person } from "../../utilities/types";

function MainProfilePage({ navigation }): JSX.Element {
  const currentPerson = useContext(AppStateContext);
  const [person, setPerson] = useState(currentPerson);

  return (
    <View style={styles.container}>
      <View style={styles.profileFrame}>
        <Image
          style={styles.profileImg}
          source={require("../../../assets/profile_img1.png")}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{currentPerson?.name}</Text>
          <Text style={styles.title}>{currentPerson?.job}</Text>
          <Text style={styles.Points}>Points: {currentPerson?.points}</Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("EditProfilePage");
            console.log("Edit Profile Page");
          }}
        >
          <Image
            style={styles.editProfileImg}
            source={require("../../../assets/pencil.png")}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.leftContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.medalContainer}>
            <Image
              style={styles.medalIcon}
              source={require("../../../assets/silver_medal.png")}
            />
            <Image
              style={styles.medalIcon}
              source={require("../../../assets/gold_medal.png")}
            />
            <Image
              style={styles.medalIcon}
              source={require("../../../assets/platinum_medal.png")}
            />
          </View>
          <Image
            style={styles.avatarImage}
            source={require("../../../assets/avatar.png")}
          />
          <View style={styles.chooseAvatarContainer}>
            <Text style={styles.chooseAvatarText}>Choose Avatar</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MainProfilePage;
