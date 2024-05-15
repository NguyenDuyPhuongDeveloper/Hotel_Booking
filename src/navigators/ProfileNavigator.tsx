import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EditProfileScreen, ProfileScreen } from '../screens'
import PartnerRegisterScreen from '../screens/profile/PartnerRegisterScreen'
import ListPropertyScreen from '../screens/profile/ListPropertyScreen'

const ProfileNavigator = () =>
{
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false

        }}>
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
            <Stack.Screen name='PartnerRegisterScreen' component={PartnerRegisterScreen} />
            <Stack.Screen name='ListPropertyScreen' component={ListPropertyScreen} />

        </Stack.Navigator>
    )
}

export default ProfileNavigator