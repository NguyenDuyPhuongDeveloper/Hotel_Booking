import React from 'react'
import { Button, StatusBar, Text, Touchable, View, TouchableOpacity, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appColors } from '../../constants/appColors'
import { RowComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import LinearGradient from 'react-native-linear-gradient'
import { appInfos } from '../../constants/appInfos'
import { fontFamilies } from '../../constants/fontFamilies'
import CircleComponent from '../../components/CircleComponent'

const HomeScreen = () =>
{
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={[ '#00BD6B', '#2D6ADC' ]} style={{
                height: 150,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: StatusBar.currentHeight,
            }}>
                <View style={{ paddingTop: 10 }}>
                    <RowComponent>
                        <TouchableOpacity>
                            <HambergerMenu color={appColors.white} size={30} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <RowComponent>
                                <TextComponent text="Yami Booking" color={appColors.white} size={24} font={fontFamilies.semiBold} />
                            </RowComponent>
                        </View>
                        <CircleComponent size={36} color={appColors.white}>
                            <View>
                                <Notification color={appColors.primary} size={24} />
                                <View style={{
                                    backgroundColor: appColors.warn,
                                    width: 10,
                                    height: 10,
                                    borderRadius: 30,
                                    borderWidth: 2,
                                    borderColor: appColors.white,
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }} />
                            </View>
                        </CircleComponent>


                    </RowComponent>
                </View>
            </LinearGradient >

            <View style={{ flex: 1 }}>

            </View>
            <Text>HomeScreen</Text>
            <Button title="Sign Out" onPress={async () =>
            {
                await AsyncStorage.clear();
                await GoogleSignin.signOut();
                dispatch( removeAuth( {} ) );
            }} />
        </View >
    )
}

export default HomeScreen