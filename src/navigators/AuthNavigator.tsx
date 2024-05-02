import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SigninScreen, SignupScreen } from '../screens';

const AuthNavigator = () =>
{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="SigninScreen" component={SigninScreen} />


            {/* <Stack.Screen name="SigninScreen" component={SigninScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}



        </Stack.Navigator>
    )
}

export default AuthNavigator