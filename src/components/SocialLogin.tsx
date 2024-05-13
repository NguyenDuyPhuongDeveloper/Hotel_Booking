
import React, { useState } from 'react'
import { ButtonComponent, RowComponent } from '.'
import { appColors } from '../constants/appColors'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authenticationAPI from '../apis/authApi';
import { useDispatch } from 'react-redux';
import { addAuth } from '../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure( {
    webClientId: '469594324050-8f0prs3n8qsrcmg38c1h7qvi0lo6m7rh.apps.googleusercontent.com',
} );

const SocialLogin = () =>
{
    const [ isLoading, setIsLoading ] = useState( false );
    const dispatch = useDispatch();
    const handleLoginWithGoogle = async () =>
    {
        await GoogleSignin.hasPlayServices( {
            showPlayServicesUpdateDialog: true,
        } );
        const api = `/google-signin`;
        try
        {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const user = userInfo.user;

            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                user,
                'post',
            );
            console.log( res );
            dispatch( addAuth( res.data ) );
            await AsyncStorage.setItem( 'auth', JSON.stringify( res.data ) );
        } catch ( error )
        {
            console.log( error );
        }
    }
    return (
        <RowComponent justify='center'>
            <ButtonComponent type='primary' color={appColors.primary} text="Facebook" />
            <ButtonComponent onPress={handleLoginWithGoogle} type='primary' color={appColors.google_logo} text="Google" />
        </RowComponent>
    )
}

export default SocialLogin