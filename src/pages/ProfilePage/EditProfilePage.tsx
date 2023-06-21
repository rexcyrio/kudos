import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, View, Text, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { launchImageLibrary, MediaType } from "react-native-image-picker";
import { Feather } from "@expo/vector-icons";
import { styles } from "./EditProfilePageStyles";
import { db } from "../../firebase";
import { Person, PersonProfilePageProps } from "../utilities/types";

const EditProfilePage = ({
  name,
  jobTitle,
  navigation,
  setName,
  setJobTitle,
}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [person, setPerson] = useState<Person | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [helperText, setHelperText] = useState("");

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [transactionErrorMessage, setTransactionErrorMessage] = useState("");

  const ref = useRef<React.ReactElement>(null);

  const handleProfilePicChange = () => {
    const options = {
      mediaType: "photo" as MediaType,
      title: "Select Profile Picture",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        setProfilePic(response.uri);
        console.log("Changed profile picture");
        console.log(profilePic);
      }
    });
  };

  const handleSaveChanges = () => {
    // Save the updated profile information to a database or API
    console.log("Saving changes...");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePicChange}>
        <View style={styles.profileImgContainer}>
          <View style={styles.profileAction}>
            <Feather name="edit-3" size={15} color="#fff" />
          </View>
          {profilePic ? (
            <Image style={styles.profileImg} source={{ uri: profilePic }} />
          ) : (
            <Image
              style={styles.profileImg}
              source={require("../../../assets/profile_img1.png")}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.prompt}>
        Edit name <Text style={{ fontWeight: "bold" }}>{person?.name}</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="text"
          autoFocus={true}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.textInput}
        />
      </View>
      <Text style={styles.prompt}>
        Edit job description{" "}
        <Text style={{ fontWeight: "bold" }}>{person?.name}</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="text"
          autoFocus={true}
          placeholder="Job Description"
          value={jobTitle}
          onChangeText={setJobTitle}
          style={styles.textInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleSaveChanges} />
      </View>
    </View>
  );
};

export default EditProfilePage;
