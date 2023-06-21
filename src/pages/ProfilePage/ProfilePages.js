import React from "react";
import { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainProfilePage from "./MainProfilePage";
import EditProfilePage from "./EditProfilePage";

function ProfilePages() {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="MainProfilePage">
            <Stack.Screen 
                name="MainProfilePage"
                component={MainProfilePage}
            />
            <Stack.Screen
                name="EditProfilePage"
                component={EditProfilePage}
            />
        </Stack.Navigator>
    );
}

export default ProfilePages;