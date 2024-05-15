import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import React from 'react'
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux'
import { ButtonComponent, CircleComponent, RowComponent, SpaceComponent, TextComponent, TitleComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import { removeAuth } from '../../redux/reducers/authReducer'
import { globalStyles } from '../../styles/globalStyles'

const ProfileScreen = ( { navigation }: any ) =>
{
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, backgroundColor: appColors.primary }}>
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

            <ScrollView style={{ flex: 1, backgroundColor: appColors.white }}>
                <View style={{
                    height: 150,
                    backgroundColor: appColors.primary
                }}>
                    <CircleComponent size={80} color={appColors.white} styles={{ alignSelf: 'center' }}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://lh3.googleusercontent.com/a/ACg8ocJvGoRycDadFX2Sk53RGm9hAET9HrKiDTUYuyDiisLj7GYzBg=s96-c',
                            }}
                        />
                    </CircleComponent>
                    <SpaceComponent height={10} />
                    <TextComponent text="John Doe" color={appColors.white} size={24} font={fontFamilies.semiBold} styles={{ alignSelf: 'center' }} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
                    <TitleComponent text="Account" color={appColors.black} size={20} font={fontFamilies.semiBold} />
                    <RowComponent justify='flex-start' >
                        <ButtonComponent onPress={() => navigation.navigate( 'EditProfileScreen' )}
                            type='primary' text="Profile" textColor={appColors.black} color='transparent' iconFlex='left' icon={<AntDesign name="user" size={20} color={appColors.warn} />}
                            styles={[ globalStyles.notShadow, { width: '100%', justifyContent: 'flex-start' } ]} />
                    </RowComponent>
                    <SpaceComponent height={10} />
                    <TitleComponent text="Setting and legal" color={appColors.black} size={20} font={fontFamilies.semiBold} />
                    <RowComponent justify='flex-start' >
                        <ButtonComponent type='primary' text="Settings" textColor={appColors.black} color='transparent' iconFlex='left' icon={<AntDesign name="setting" size={20} color={appColors.warn} />}
                            styles={[ globalStyles.notShadow, { width: '100%', justifyContent: 'flex-start' } ]} />
                    </RowComponent>
                    <RowComponent justify='flex-start' >
                        <ButtonComponent type='primary' text="Reviews" textColor={appColors.black} color='transparent' iconFlex='left' icon={<MaterialIcons name="preview" size={20} color={appColors.warn} />}
                            styles={[ globalStyles.notShadow, { width: '100%', justifyContent: 'flex-start' } ]} />
                    </RowComponent>
                    <SpaceComponent height={10} />
                    <TitleComponent text="Help and support" color={appColors.black} size={20} font={fontFamilies.semiBold} />

                    <RowComponent justify='flex-start' >
                        <ButtonComponent type='primary' text="Help" textColor={appColors.black} color='transparent' iconFlex='left' icon={<AntDesign name="question" size={20} color={appColors.warn} />}
                            styles={[ globalStyles.notShadow, { width: '100%', justifyContent: 'flex-start' } ]} />
                    </RowComponent>
                    <SpaceComponent height={10} />
                    <TitleComponent text="Partners" color={appColors.black} size={20} font={fontFamilies.semiBold} />
                    <RowComponent justify='flex-start' >
                        <ButtonComponent type='primary' text="List your property" textColor={appColors.black} color='transparent' iconFlex='left' icon={<MaterialIcons name="domain-add" size={20} color={appColors.warn} />}
                            styles={[ globalStyles.notShadow, { width: '100%', justifyContent: 'flex-start' } ]} />
                    </RowComponent>
                    <RowComponent justify='flex-start' >
                        <ButtonComponent type='primary' text="Sign Out" textColor={appColors.black} color='transparent' iconFlex='left' icon={<AntDesign style={{ transform: [ { rotateY: '180deg' } ] }} name="logout" size={20} color={appColors.warn} />}
                            styles={[ globalStyles.notShadow, { width: '100%', justifyContent: 'flex-start' } ]}
                            onPress={async () =>
                            {
                                await AsyncStorage.clear();
                                await GoogleSignin.signOut();
                                dispatch( removeAuth( {} ) );
                            }} />
                    </RowComponent>
                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create( {
    tinyLogo: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: appColors.white,
    },
} );

export default ProfileScreen