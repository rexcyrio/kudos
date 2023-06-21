import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  leftContent: {
    padding: 20,
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
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
  },
  medalContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  medalIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  avatarImage: {
    width: 200,
    height: 200,
  },
  chooseAvatarContainer: {
    width: "100%",
    padding: 10,
  },
  chooseAvatarText: {
    textAlign: "center",
    fontSize: 22,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#FFAFED",
  },
});
