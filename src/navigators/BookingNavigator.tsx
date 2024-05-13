import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BookingScreen } from '../screens'

const BookingNavigator = () =>
{
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false

        }}>
            <Stack.Screen name='Booking' component={BookingScreen} />
        </Stack.Navigator>
    )
}

export default BookingNavigator