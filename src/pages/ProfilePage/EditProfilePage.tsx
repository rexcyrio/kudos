import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { launchImageLibrary, MediaType } from "react-native-image-picker";
import { styles } from "./EditProfilePageStyles";
import { db } from "../../../firebase";
import { Person } from "../../utilities/types";
import { AppStateContext } from "../../../App";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const EditProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const currentPerson = useContext(AppStateContext);
  const [person, setPerson] = useState(currentPerson);

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

  const handleSaveChanges = async () => {
    const userRef = doc(db, "users", currentPerson.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, {
      job: person.job,
      name: person.name,
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleProfilePicChange}>
        {profilePic ? (
          <Image style={styles.profileImg} source={{ uri: profilePic }} />
        ) : (
          <Image
            style={styles.profileImg}
            source={require("../../../assets/profile_img1.png")}
          />
        )}
        <Text>Change Profile Picture</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Name"
        value={person?.name}
        onChangeText={(name) => setPerson({ ...person, name: name })}
      />
      <TextInput
        placeholder="Job Description"
        value={person?.job}
        onChangeText={(job) => setPerson({ ...person, job: job })}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default EditProfilePage;
