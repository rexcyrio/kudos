import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  runTransaction,
  updateDoc
} from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Keyboard, Text, TouchableOpacity, View, StyleSheet, Image, ScrollView } from "react-native";
import {
  HelperText,
  Modal,
  Portal,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { db } from "../../firebase";
import { Person, PersonProfilePageProps } from "../utilities/types";
import { MaterialIcons } from '@expo/vector-icons';

function PersonProfilePage({
  navigation,
  route,
}: PersonProfilePageProps): JSX.Element {
  const CURRENT_USER_ID = route.params.id;

  const [person, setPerson] = useState<Person | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [helperText, setHelperText] = useState("");

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [transactionErrorMessage, setTransactionErrorMessage] = useState("");

  const ref = useRef<React.ReactElement>(null);

  useEffect(() => {
    const documentRef = doc(db, "users", CURRENT_USER_ID);

    const unsubscribe = onSnapshot(documentRef, (document) => {
      const person = {
        id: document.id,
        ...document.data(),
      } as Person;

      setPerson(person);
    });

    return unsubscribe;
  }, [CURRENT_USER_ID]);

  const handleModalOpen = useCallback(() => {
    setIsModalVisible(true);
    setUserInput("");
    setHelperText("");
    setIsSnackbarVisible(false);
    setTransactionErrorMessage("");
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

  const isNewUserInputValid = useCallback((text: string): boolean => {
    if (text.length === 0 || !text.match(onlyDigits)) {
      setHelperText("Invalid number");
      return false;
    }

    const maybeNumber = Number.parseInt(text);

    if (Number.isNaN(maybeNumber) || !Number.isInteger(maybeNumber)) {
      setHelperText("Invalid number");
      return false;
    }

    if (maybeNumber <= 0) {
      setHelperText("Minimum number of Kindness points is 1");
      return false;
    }

    if (maybeNumber > 100) {
      setHelperText("Maximum number of Kindness points is 100");
      return false;
    }

    setHelperText("");
    return true;
  }, []);

  const handleChangeText = useCallback(
    (text: string) => {
      setUserInput(text);
      isNewUserInputValid(text);
    },
    [isNewUserInputValid]
  );

  const handleConfirm = useCallback(async () => {
    if (!isNewUserInputValid(userInput)) {
      return;
    }

    const numPointsToBeAdded = Number.parseInt(userInput);

    const newPointsHistoryEntry = {
      timestamp: new Timestamp(Math.floor(Date.now() / 1000), 0),
      points: numPointsToBeAdded,
    };

    try {
      await runTransaction(db, async (transation) => {
        await addDoc(
          collection(db, "users", CURRENT_USER_ID, "pointsHistory"),
          newPointsHistoryEntry
        );

        await updateDoc(doc(db, "users", CURRENT_USER_ID), {
          points: increment(numPointsToBeAdded),
        });
      });
    } catch (error: any) {
      setTransactionErrorMessage(error.toString());
      console.log("Transaction failed: ", error);
    }

    handleSnackbarOpen();
    handleModalClose();
  }, [
    userInput,
    CURRENT_USER_ID,
    handleModalClose,
    isNewUserInputValid,
    handleSnackbarOpen,
  ]);

  const reshowKeyboardIfNeeded = useCallback(() => {
    if (Keyboard.isVisible()) {
      return;
    }

    ref.current?.blur();

    setTimeout(() => {
      ref.current?.focus();
    }, 0);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#FFDCF8'}}>
    <View style={styles.container}>
      {person && (
        <View style={styles.headerContent}>
          <View style={styles.profileInfoItem}>
            <Image source={{ uri: person.profilePicture }} style={styles.avatar} />
          </View>
          <View style={styles.profileInfoItem}>
            <Text style={styles.name}>{person.name}</Text>
          </View>
          <View style={styles.profileInfoItem}>
            <Text style={styles.userInfo}>{person.job}</Text>
          </View>
          <View style={styles.profileInfoItem}>
            <Text style={styles.userInfo}>{person.location}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={handleModalOpen}
        style={styles.addButton}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#ce00ff" style={styles.addButtonIcon} />
        <Text>Add Kindness Points  </Text>
        <MaterialCommunityIcons name="cards-heart" size={16} color="#ce00ff" />
      </TouchableOpacity>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointsBody}>Kindness Points</Text>
        <Text style={styles.pointsBody}>{person?.points}</Text>
      </View>
  
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={handleSnackbarClose}
        style={{
          backgroundColor:
            transactionErrorMessage === "" ? "lightgreen" : "#FF8282",
        }}
      >
        {transactionErrorMessage === "" ? (
          <Text>
            Awarded {person?.name} {Number.parseInt(userInput)} Kindness points
            successfully!
          </Text>
        ) : (
          <Text>ERROR: {transactionErrorMessage}</Text>
        )}
      </Snackbar>
  
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={handleModalClose}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>
            How many Kindness points would you like to award{" "}
            <Text style={styles.modalTitleBold}>{person?.name}</Text>?
          </Text>
          <TextInput
            mode="outlined"
            value={userInput}
            error={helperText !== ""}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            autoFocus={true}
            style={styles.input}
          />
          <HelperText type="error" visible={helperText !== ""}>
            {helperText}
          </HelperText>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            disabled={helperText !== ""}
          />
        </Modal>
      </Portal>
    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  pointsContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 10,
    gap: 10
  },
  pointsBody: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFDCF8',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  addButtonIcon: {
    marginRight: 5,
  },
  profileInfo: {
    marginBottom: 10,
  },
  profileInfoItem: {
    marginBottom: 5,
  },
  profileInfoText: {
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  modalTitleBold: {
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
});


const onlyDigits = /^[0-9]+$/;

export default React.memo(PersonProfilePage);