import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import {
  HelperText,
  Modal,
  Portal,
  Snackbar,
  TextInput,
} from "react-native-paper";

import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { launchImageLibrary, MediaType } from "react-native-image-picker";
import { Feather } from "@expo/vector-icons";
import { styles } from "./EditProfilePageStyles";

import { db } from "../../../firebase";
import { Person, PersonProfilePageProps } from "../../utilities/types";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AppStateContext } from "../../../context";

const EditProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);

  const currentPerson = useContext(AppStateContext);
  const [person, setPerson] = useState(currentPerson);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [helperText, setHelperText] = useState("");


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

  const handleSaveChanges = async () => {
    setIsModalVisible(false);
    const userRef = doc(db, "users", currentPerson.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, {
      job: person.job,
      name: person.name,
    });
  };

  const handleModalOpen = useCallback(() => {
    setIsModalVisible(true);
    setUserInput("");
    setHelperText("");
    setIsSnackbarVisible(false);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleSnackbarOpen = useCallback(() => {
    setIsSnackbarVisible(true);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setIsSnackbarVisible(false);
  }, []);

  return (
    <ScrollView>
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
                source={{ uri: currentPerson.profilePicture }}
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
            value={person?.name}
            onChangeText={(name) => setPerson({ ...person, name: name })}
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
            value={person?.job}
            onChangeText={(job) => setPerson({ ...person, job: job })}
            style={styles.textInput}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save Changes" onPress={handleModalOpen} />
        </View>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={handleModalClose}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            Are you sure you want to edit your profile:{" "}
          </Text>
          <Button
            title="No"
            onPress={handleModalClose}
            color="red"
          />
          <Button
            title="Yes"
            onPress={handleSaveChanges}
            color="green"
          />
        </Modal>
      </Portal>
    </View>
    </ScrollView>

  );
};

export default EditProfilePage;
