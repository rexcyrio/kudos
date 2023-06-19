import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';

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
  
    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else {
            // setProfilePic(response.uri);
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
