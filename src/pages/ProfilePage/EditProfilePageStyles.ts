import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  profileImgContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileAction: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#007bff",
    position: "absolute",
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  prompt: {
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "left",
    alignSelf: "stretch",
  },
  inputContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalContentContainer: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "50%",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
    width: "50%",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
