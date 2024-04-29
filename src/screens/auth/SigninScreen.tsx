import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SigninScreen = () =>
{
    return (
        <View>
            <Text>SigninScreen</Text>
            <Button title='Login' onPress={async () => await AsyncStorage.setItem( 'assetToken', 'fadsfdsf' )} />
        </View>
    )
}

export default SigninScreen