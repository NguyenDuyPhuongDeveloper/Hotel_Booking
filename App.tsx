import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


const App = () =>
{
  const [ isShowSplash, setIsShowSplash ] = useState( true );

  const [ accessToken, setAccessToken ] = useState( '' );
  const { getItem, setItem } = useAsyncStorage( 'assetToken' );

  useEffect( () =>
  {
    const timeout = setTimeout( () =>
    {
      setIsShowSplash( false );
    }, 1500 );

    return () => clearTimeout( timeout );
  }, [] );

  useEffect( () =>
  {
    checkLogin();
  }, [] );

  const checkLogin = async () =>
  {
    const token = await getItem();
    token && setAccessToken( token );
  }
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {/* {accessToken ? <MainNavigator /> : <AuthNavigator />} */}
          <AuthNavigator />
        </NavigationContainer>
      )}
    </>
  )
};

export default App