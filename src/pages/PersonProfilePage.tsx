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
import { Button, Keyboard, Text, TouchableOpacity, View } from "react-native";
import {
  HelperText,
  Modal,
  Portal,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { db } from "../../firebase";
import { Person, PersonProfilePageProps } from "../utilities/types";

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
    <View style={{ height: "100%" }}>
      <TouchableOpacity
        onPress={handleModalOpen}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          borderRadius: 10,
          backgroundColor: "lightgray",
          paddingVertical: 3,
          paddingHorizontal: 5,
        }}
      >
        <Text>+</Text>
        <MaterialCommunityIcons name="cards-heart" size={24} color="#ce00ff" />
      </TouchableOpacity>

      <View>
        <Text>id: {person?.id}</Text>
        <Text>job: {person?.job}</Text>
        <Text>location: {person?.location}</Text>
        <Text>name: {person?.name}</Text>
        <Text>profilePicture: {person?.profilePicture}</Text>
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
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            How many Kindness points would you like to award{" "}
            <Text style={{ fontWeight: "bold" }}>{person?.name}</Text>?
          </Text>
          <TextInput
            inputMode="numeric"
            value={userInput}
            error={helperText !== ""}
            onChangeText={handleChangeText}
            autoFocus={true}
            ref={ref}
            onPressIn={reshowKeyboardIfNeeded}
          />
          <HelperText
            type="error"
            visible={helperText !== ""}
            style={{ marginBottom: 15 }}
          >
            {helperText}
          </HelperText>
          <Button title="Confirm" onPress={handleConfirm} />
        </Modal>
      </Portal>
    </View>
  );
}

const onlyDigits = /^[0-9]+$/;

export default React.memo(PersonProfilePage);
