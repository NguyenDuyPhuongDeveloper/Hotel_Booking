import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'
import { SplashScreen } from '../screens'

const AppRouters = () =>
{
    const [ isShowSplash, setIsShowSplash ] = useState( true );
    const { getItem } = useAsyncStorage( 'auth' );
    const auth = useSelector( authSelector );
    const dispatch = useDispatch();

    useEffect( () =>
    {
        checkLogin();
        const timeout = setTimeout( () =>
        {
            setIsShowSplash( false );
        }, 1500 );
        return () => clearTimeout( timeout );
    }, [] );
    // const saveToken = async ( token: any ) =>
    // {
    //     try
    //     {
    //         const authData = JSON.stringify( { accessToken: token } );
    //         await AsyncStorage.setItem( 'auth', authData );
    //         console.log( 'Token saved successfully:', authData );
    //     } catch ( error )
    //     {
    //         console.error( 'Error saving token to AsyncStorage:', error );
    //     }
    // }

    const checkLogin = async () =>
    {
        const res = await getItem();
        console.log( 'check Login-authRouter', res );
        // await saveToken( JSON.parse( res ).accesstoken );

        res && dispatch( addAuth( JSON.parse( res ) ) );
    };
    return (
        <>
            {isShowSplash ? <SplashScreen /> : ( auth && auth.accesstoken ) ? < MainNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppRouters