import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForgotPassword, SigninScreen, SignupScreen, VerificationScreen } from '../screens';

const AuthNavigator = () =>
{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="SigninScreen" component={SigninScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} />


        </Stack.Navigator>
    )
}

export default AuthNavigator