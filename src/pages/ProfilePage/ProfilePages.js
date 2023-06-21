import React from "react";
import { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainProfilePage from "./MainProfilePage";
import EditProfilePage from "./EditProfilePage";

function ProfilePages() {

    const [name, setName] = useState("Jethro Sim");
    const [jobTitle, setJobTitle] = useState("Software Engineer");
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="MainProfilePage">
            <Stack.Screen
                name="MainProfilePage"
                children={(props) => (
                    <MainProfilePage {...props} name={name} jobTitle={jobTitle} />
                )}/>
            <Stack.Screen
                name="EditProfilePage"
                children={(props) => (
                    <EditProfilePage {...props} name={name} jobTitle={jobTitle} setName={setName} setJobTitle={setJobTitle} />
                )}/>
        </Stack.Navigator>
    );
}

export default ProfilePages;
