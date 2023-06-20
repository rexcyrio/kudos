import React from "react";
import { StyleSheet, View, Image, Text, TouchableHighlight } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './MainProfilePageStyles';

function MainProfilePage({ name, jobTitle, navigation }): JSX.Element {

  const Stack = createNativeStackNavigator();
  
  return (
    <View style={styles.container}>
        <View style={styles.profileFrame}>
          <Image
            style={styles.profileImg}
            source={require("../../../assets/profile_img1.png")}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>{jobTitle}</Text>
            <Text style={styles.Points}>{`1000 points`}</Text>
          </View>
          <TouchableHighlight onPress={() => {
            navigation.navigate("EditProfilePage");
            console.log("Edit Profile Page");
          }}>
            <Image
              style={styles.editProfileImg}
              source={require('../../../assets/pencil.png')}
            />
          </TouchableHighlight>
        </View>
      <View style={styles.leftContent}>
        <View style={styles.avatarContainer}>
        <View style={styles.medalContainer}>
          <Image
            style={styles.medalIcon}
            source={require("../../assets/silver_medal.png")}
          />
          <Image
            style={styles.medalIcon}
            source={require("../../assets/gold_medal.png")}
          />
          <Image
            style={styles.medalIcon}
            source={require("../../assets/platinum_medal.png")}
          />
          </View>
          <Image
            style={styles.avatarImage}
            source={require("../../assets/avatar.png")}
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