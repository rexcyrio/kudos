import { doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useContext, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal, RadioButton } from "react-native-paper";
import { db } from "../../../firebase";
import { styles } from "./MainProfilePageStyles";
import { AppStateContext } from "../../../context";

function MainProfilePage({ navigation }): JSX.Element {
  const currentPerson = useContext(AppStateContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleSelectNewRadioButton = useCallback(
    async (newRadioButtonValue: string) => {
      setIsModalVisible(false);

      await updateDoc(doc(db, "users", currentPerson.id), {
        avatar: newRadioButtonValue,
      });
    },
    [currentPerson.id]
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileFrame}>
        <Image
          style={styles.profileImg}
          source={{ uri: currentPerson.profilePicture }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{currentPerson?.name}</Text>
          <Text style={styles.title}>{currentPerson?.job}</Text>
          <Text style={styles.Points}>Points: {currentPerson?.points}</Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("EditProfilePage");
            console.log("Edit Profile Page");
          }}
        >
          <Image
            style={styles.editProfileImg}
            source={require("../../../assets/pencil.png")}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.leftContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.medalContainer}>
            <Image
              style={styles.medalIcon}
              source={require("../../../assets/silver_medal.png")}
            />
            <Image
              style={styles.medalIcon}
              source={require("../../../assets/gold_medal.png")}
            />
            <Image
              style={styles.medalIcon}
              source={require("../../../assets/platinum_medal.png")}
            />
          </View>
          <Image
            style={styles.avatarImage}
            source={mappingAvatarNameToImageSource[currentPerson.avatar]}
          />

          <TouchableOpacity
            style={styles.chooseAvatarContainer}
            onPress={handleModalOpen}
          >
            <Text style={styles.chooseAvatarText}>Choose Avatar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={handleModalClose}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <RadioButton.Group
            onValueChange={handleSelectNewRadioButton}
            value={currentPerson.avatar}
          >
            <FlatList
              data={Object.keys(mappingAvatarNameToImageSource)}
              renderItem={({ item: avatarName }) => (
                <TouchableOpacity
                  onPress={() => handleSelectNewRadioButton(avatarName)}
                  style={mainProfilePageStyles.radioButtonRowWrapper}
                >
                  <RadioButton value={avatarName} />
                  <Image
                    style={mainProfilePageStyles.image}
                    source={mappingAvatarNameToImageSource[avatarName]}
                  />
                </TouchableOpacity>
              )}
            />
          </RadioButton.Group>
        </Modal>
      </Portal>
    </View>
  );
}

const mainProfilePageStyles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
  },
  radioButtonRowWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const mappingAvatarNameToImageSource: { [key: string]: ImageSourcePropType } = {
  blank: require("../../../assets/avatar_redo_1.png"),
  pink: require("../../../assets/avatar_redo_2.png"),
  dog: require("../../../assets/avatar_redo_3.png"),
  aang: require("../../../assets/avatar_redo_4.png"),
};

export default MainProfilePage;
