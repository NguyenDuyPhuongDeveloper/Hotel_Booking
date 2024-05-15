import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SavedScreen } from '../screens'

const SavedNavigator = () =>
{
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false

        }}>
            <Stack.Screen name='SavedScreen' component={SavedScreen} />
        </Stack.Navigator>
    )
}

export default SavedNavigator