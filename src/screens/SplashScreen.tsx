import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfos } from '../constants/appInfos'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashScreen = () =>
{
    return (
        <ImageBackground
            source={require( '../assets/images/splash-img.png' )}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            imageStyle={{ flex: 1 }} >
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
        </ImageBackground>

    )
}

export default SplashScreen