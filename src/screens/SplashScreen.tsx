import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfos } from '../constants/appInfos'
import { SpaceComponent, TextComponent } from '../components'
import { appColors } from '../constants/appColors'
import LinearGradientComponent from '../components/LinearGradientComponent'

const SplashScreen = () =>
{
    return (
        <LinearGradientComponent colors={[ '#00BD6B', '#2D6ADC' ]}  >
            <Image source={require( '../assets/images/Logo-icon.png' )} />
            <Image source={require( '../assets/images/logo-text-1.png' )}
                style={{
                    width: appInfos.sizes.WIDTH * 0.6,
                    resizeMode: 'contain'
                }} />
            <SpaceComponent height={5} />
            <Image source={require( '../assets/images/logo-find-hotel.png' )}
                style={{
                    width: appInfos.sizes.WIDTH * 0.6,
                    resizeMode: 'contain'
                }} />
            <SpaceComponent height={16} />
            <ActivityIndicator color={appColors.white} size={24} />
            {/* <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} />
            <TextComponent text='Forgot password?' color={appColors.warn} /> */}

        </LinearGradientComponent>



    )
}

export default SplashScreen