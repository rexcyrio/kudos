import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { TextInput } from "react-native-paper";
import { Image, View, Text, TouchableOpacity, Button } from "react-native";
import { launchImageLibrary, MediaType } from "react-native-image-picker";
import { Feather } from "@expo/vector-icons";
import { styles } from "./ProfilePage/EditProfilePageStyles";

import { db } from "../../firebase";
import { Person, PersonProfilePageProps } from "../utilities/types";
import { AppStateContext } from "../../App";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const SignupPage = (props: any) => {
  const { uid } = props;
  const [profilePic, setProfilePic] = useState(null);

  const currentPerson = useContext(AppStateContext);
  const [person, setPerson] = useState(currentPerson);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [helperText, setHelperText] = useState("");

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [transactionErrorMessage, setTransactionErrorMessage] = useState("");

  const ref = useRef<React.ReactElement>(null);

  const handleSaveChanges = async () => {
    const userRef = doc(db, "users", uid);

    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, {
      job: person.job,
      name: person.name,
    });
  };
  console.log("Entered Signup Page");

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>
        Name <Text style={{ fontWeight: "bold" }}>{person?.name}</Text>
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
        Job title <Text style={{ fontWeight: "bold" }}>{person?.name}</Text>
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
        <Button title="Save Changes" onPress={handleSaveChanges} />
      </View>
    </View>
  );
};

export default SignupPage;
