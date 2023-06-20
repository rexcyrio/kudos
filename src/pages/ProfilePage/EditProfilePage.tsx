import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import { styles } from './EditProfilePageStyles';

const EditProfilePage = ({ name, jobTitle, navigation, setName, setJobTitle }) => {
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response: any) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else {
            setProfilePic(response.uri);
            console.log("Changed profile picture");
            console.log(profilePic);
        }
    });
  };


  const handleSaveChanges = () => {
    // Save the updated profile information to a database or API
    console.log('Saving changes...');
  };

  return (
    <View>
      <TouchableOpacity onPress={handleProfilePicChange}>
        {profilePic ? (
          <Image style={styles.profileImg} source={{ uri: profilePic }} />
        ) : (
          <Image style={styles.profileImg} source={require('../../../assets/profile_img1.png')} />
        )}
        <Text>Change Profile Picture</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Job Description"
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default EditProfilePage;
