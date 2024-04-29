import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator'


const App = () =>
{
  const [ isShowSplash, setIsShowSplash ] = useState( true );
  useEffect( () =>
  {
    const timeout = setTimeout( () =>
    {
      setIsShowSplash( false );
    }, 1500 );

    return () => clearTimeout( timeout );
  }, [] );
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
    </>
  )
};

export default App