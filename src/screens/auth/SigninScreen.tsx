import { View, Text, Button, ImageBackground } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ButtonComponent from '../../components/ButtonComponent'
import { globalStyles } from '../../styles/globalStyles'
import Container from '../../components/Container'
import BlankComponent from '../../components/BlankComponent'
import LinearGradient from 'react-native-linear-gradient';
import { TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import LinearGradientComponent from '../../components/LinearGradientComponent'
import InputComponent from '../../components/InputComponent'

const SigninScreen = () =>
{

    return (
        // <View style={[ globalStyles.container, { padding: 16, backgroundColor: 'coral' } ]}>
        //     <Text>SigninScreen</Text>
        //     {/* <Button title='Login' onPress={async () => await AsyncStorage.setItem( 'assetToken', 'fadsfdsf' )} /> */}
        //     <ButtonComponent type='primary' text="SIGN IN" onPress={() => console.log( 'Login' )}
        //         icon={<View>N</View>}
        //     />
        // </View>


        <LinearGradientComponent colors={[ '#00BD6B', '#2D6ADC' ]}  >
            <BlankComponent title='Sign In' height='70%' width='80%'>
                <InputComponent placeholder='Họ và tên' allowClear />
                <ButtonComponent type='primary' color={appColors.primary} text="SIGN IN" />
            </BlankComponent>
        </LinearGradientComponent>







    )
}

export default SigninScreen