import React from 'react'
import { StatusBar, TouchableOpacity, View } from 'react-native'

import { HambergerMenu, Notification } from 'iconsax-react-native'
import LinearGradient from 'react-native-linear-gradient'
import { RowComponent, TextComponent } from '../../components'
import CircleComponent from '../../components/CircleComponent'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import MainSearchBox from '../search/MainSearchBox'

const HomeScreen = () =>
{

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={[ '#00BD6B', '#2D6ADC' ]} style={{
                height: 120,
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

            <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
                <MainSearchBox />
            </View>

        </View >
    )
}

export default HomeScreen