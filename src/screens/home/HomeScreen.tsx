import React from 'react'
import { Button, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () =>
{
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HomeScreen</Text>
            <Button title="Sign Out" onPress={async () =>
            {
                await AsyncStorage.clear();
                await GoogleSignin.signOut();
                dispatch( removeAuth( {} ) );
            }} />
        </View>
    )
}

export default HomeScreen