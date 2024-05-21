import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { BlankComponent, ButtonComponent, SectionComponent, SpaceComponent, TitleComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import { LoadingModal } from '../../modals'
import userAPI from '../../apis/userApi'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { removeAuth } from '../../redux/reducers/authReducer'

const SettingScreen = ( { navigation, route }: any ) =>
{
    const { getItem } = useAsyncStorage( 'auth' );
    const dispatch = useDispatch();

    const outClient = async () =>
    {
        await AsyncStorage.clear();
        await GoogleSignin.signOut();
        dispatch( removeAuth( {} ) );
    }
    const handleDeleteAccount = async () =>
    {
        const id = route.params;
        console.log( 'ID:', id );
        const api = `/deleteUser?uid=${ id }`;
        setIsLoading( true )
        outClient();
        try
        {
            const res = await userAPI.HandleUser( api, null, 'delete' );
            setIsLoading( false );
            console.log( 'Delete account res:', res );
            outClient();


        } catch ( error )
        {
            setIsLoading( false )
            console.error( 'Error deleting account:', error );
        }

    }
    const [ isLoading, setIsLoading ] = useState( false );
    return (
        <>
            <BlankComponent title={'Settings'}
                styles={{
                    padding: 24,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    justifyContent: 'flex-start',
                    alignContent: 'center',
                    flexDirection: 'column'
                }} back topBarColor={appColors.light_green} >
                <SectionComponent >
                    <TitleComponent styles={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} size={20} text='Delete your Account' font={fontFamilies.bold} />
                </SectionComponent>
                <SpaceComponent height={20} />
                <SectionComponent>
                    <ButtonComponent
                        text='Delete Account'
                        type='primary'
                        styles={{ width: '80%' }}
                        color={appColors.warn}
                        onPress={handleDeleteAccount}

                    />
                </SectionComponent>
            </BlankComponent>
            <LoadingModal visible={isLoading} />
        </>
    )
}

export default SettingScreen