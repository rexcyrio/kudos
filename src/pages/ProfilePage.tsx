import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function ProfilePage(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.profileFrame}>
        <Image
          style={styles.profileImg}
          source={require("../../assets/profile_img1.png")}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{`Jethro Sim`}</Text>
          <Text style={styles.title}>{`Product Manager`}</Text>
          <Text style={styles.Points}>{`1000 points`}</Text>
        </View>
        <Image
          style={styles.editProfileImg}
          source={require("../../assets/pencil.png")}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  leftContent: {
    flex: 1,
    justifyContent: "center",
    margin: 50,
  },
  Points: {
    margin: 16,
    marginTop: 0,
    height: 17,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "left",
    textAlignVertical: "top",
    color: "#bfbfbf",
  },
  name: {
    margin: 10,
    height: 27,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "left",
    textAlignVertical: "top",
  },
  title: {
    margin: 16,
    marginTop: 0,
    marginBottom: 0,
    height: 16,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "left",
    textAlignVertical: "top",
  },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
  },
  profileImg: {
    marginLeft: 15,
    marginTop: 0,
    width: 100,
    height: 100,
    borderRadius: 700,
  },
  profileFrame: {
    flexDirection: "row",
    alignItems: "center",
    height: 110,
    backgroundColor: "#e0e0e0",
  },
  editProfileImg: {
    marginLeft: "auto",
    marginRight: 35,
    marginTop: 35,
    width: 30,
    height: 30,
    borderRadius: 0,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  medalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  medalIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  avatarImage: {
    width: "80%",
    height: "80%",
    borderRadius: 60,
  },
  chooseAvatarContainer: {
    backgroundColor: "#e9e9e9",
    padding: 10,
    marginTop: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  chooseAvatarText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
  },
});

export default ProfilePage;
