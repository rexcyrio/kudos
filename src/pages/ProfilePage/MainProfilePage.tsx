import React from "react";
import { StyleSheet, View, Image, Text, TouchableHighlight } from "react-native";
import {Svg, Path} from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function MainProfilePage({ name, jobTitle, navigation }): JSX.Element {

  const Stack = createNativeStackNavigator();
  
  return (
    <View style={styles.container}>
        <View style={styles.profileFrame}>
          <Image
            style={styles.profileImg}
            source={require('/assets/profile_img1.png')}
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
              source={require('/assets/pencil.png')}
            />
          </TouchableHighlight>
        </View>
      <View style={styles.leftContent}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatarImage}
            source={require('/assets/avatar.png')}
          />
          <View style={styles.chooseAvatarContainer}>
            <Text style={styles.chooseAvatarText}>Choose Avatar</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  leftContent: {
    flex: 1,
    justifyContent: 'center',
    margin: 50
  },
  Points: {
    margin: 16,
    marginTop: 0,
    height: 17,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#bfbfbf',
  },
  name: {
    margin: 10,
    height: 27,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  title: {
    margin: 16,
    marginTop: 0,
    marginBottom: 0,
    height: 16,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImg: {
    marginLeft: 15,
    marginTop: 0,
    width: 100,
    height: 100,
    borderRadius: 700,
  },
  profileFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#e0e0e0',
  },
  editProfileImg: {
    marginLeft: 'auto',
    marginRight: 35,
    marginTop: 35,
    width: 30,
    height: 30,
    borderRadius: 0,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  chooseAvatarContainer: {
    backgroundColor: '#e9e9e9',
    padding: 10,
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  chooseAvatarText: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default MainProfilePage;