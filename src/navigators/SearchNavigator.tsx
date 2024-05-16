import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BookingScreen, HomeScreen } from '../screens'
import SearchScreen from '../screens/search/SearchScreen'
import HotelDetails from '../screens/search/HotelDetails'

const SearchNavigator = () =>
{
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false

        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='HotelDetails' component={HotelDetails} />
            <Stack.Screen name='BookingScreen' component={BookingScreen} />
        </Stack.Navigator>
    )
}

export default SearchNavigator