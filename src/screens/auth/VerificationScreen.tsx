import { ArrowRight } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { BlankComponent, ButtonComponent, InputComponent, LinearGradientComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import authenticationAPI from '../../apis/authApi';
import { LoadingModal } from '../../modals';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VerificationScreen = ( { navigation, route }: any ) =>
{
    const { code, email, password, username } = route.params;


    const [ codeValues, setCodeValues ] = useState<string[]>( [] );
    const [ newCode, setNewCode ] = useState<string>( '' );
    const [ currentCode, setCurrentCode ] = useState<string>( code );
    const [ time, setTime ] = useState( 59 );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( '' );

    useEffect( () => 
    {
        if ( time > 0 ) 
        {
            const interval = setInterval( () => 
            {
                time > 0
                    && setTime( timer => timer - 1 );
            }, 1000 );
            return () => clearInterval( interval );
        }
    }, [] );
    useEffect( () =>
    {
        let item = '';
        codeValues.map( ( value ) => item += value );
        setNewCode( item );
    }, [ codeValues ] );
    const handleChangeCode = ( value: string, index: number ) =>
    {
        const data = [ ...codeValues ];
        data[ index ] = value;
        setCodeValues( data );
    };

    const ref1 = useRef<any>();
    const ref2 = useRef<any>();
    const ref3 = useRef<any>();
    const ref4 = useRef<any>();
    const dispatch = useDispatch();

    useEffect( () =>
    {
        ref1.current.focus();
    }, [] );

    const handleResendVerification = async () =>
    {
        setCodeValues( [ '', '', '', '' ] );
        setNewCode( '' );
        setErrorMessage( '' );
        setIsLoading( true );
        const api = '/verification';
        try
        {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email },
                'post'
            );
            setTime( 59 );
            setCurrentCode( res.data.verificationCode );
            console.log( res );
            setIsLoading( false );
        } catch ( err )
        {
            console.log( `Can not send verification code ${ err }` )
        }
    }
    const handleVerification = async () =>
    {

        if ( time > 0 )
        {
            if ( parseInt( newCode ) != parseInt( currentCode ) )
            {
                setErrorMessage( "Invalid code!" );
                return;
            }
            else
            {
                setErrorMessage( '' );
                console.log( 'Registered' );
                const data = {
                    email,
                    username: username ?? '',
                    password,
                };
                try
                {
                    setIsLoading( true );
                    const res = await authenticationAPI.HandleAuthentication( '/register', data, 'post' );
                    console.log( res );
                    setIsLoading( false );
                    dispatch( addAuth( res.data ) );
                    await AsyncStorage.setItem( 'auth', JSON.stringify( res.data ) );
                } catch ( err )
                {
                    setErrorMessage( 'User has already exist!' );
                    console.log( err );
                    setIsLoading( false );
                }

            }
        }
        else
        {
            setErrorMessage( "Verification code is expired! Please resend new verification code!" );
        }
    }
    return (
        <LinearGradientComponent isBackground colors={[ '#00BD6B', '#2D6ADC' ]} >
            <BlankComponent back title='Verification' height='90%' width='90%'
                styles={{
                    padding: 24,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    justifyContent: 'flex-start',
                    alignContent: 'center',
                    flexDirection: 'column'
                }}>
                <SectionComponent styles={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    marginTop: 10,
                }}>
                    <TextComponent text={`We've sen you the verification code on ${ email.replace( /.{1,5}/, ( m: any ) => '*'.repeat( m.length ), ) }`} />
                    <SpaceComponent height={20} />
                    <RowComponent justify='space-around'>
                        <TextInput onChangeText={val =>
                        {
                            handleChangeCode( val, 0 );
                            val.length > 0
                                && ref2.current.focus()
                        }} value={codeValues[ 0 ]} keyboardType='number-pad' ref={ref1} maxLength={1} placeholder='-' style={[ styles.input ]} />
                        <TextInput onChangeText={val =>
                        {
                            handleChangeCode( val, 1 );
                            val.length > 0
                                && ref3.current.focus()
                        }} value={codeValues[ 1 ]} keyboardType='number-pad' ref={ref2} maxLength={1} placeholder='-' style={[ styles.input ]} />
                        <TextInput onChangeText={val =>
                        {
                            handleChangeCode( val, 2 );
                            val.length > 0
                                && ref4.current.focus()
                        }} value={codeValues[ 2 ]} keyboardType='number-pad' ref={ref3} maxLength={1} placeholder='-' style={[ styles.input ]} />
                        <TextInput onChangeText={val =>
                        {
                            handleChangeCode( val, 3 );
                            val.length > 0
                                && ref4.current.blur()
                        }} value={codeValues[ 3 ]} keyboardType='number-pad' ref={ref4} maxLength={1} placeholder='-' style={[ styles.input ]} />
                    </RowComponent>
                </SectionComponent>
                <SpaceComponent height={10} />
                <SectionComponent styles={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    marginTop: 10,
                }}>
                    <ButtonComponent
                        onPress={handleVerification}
                        disable={newCode.length != 4}
                        type='primary'
                        text='Send'
                        icon={<ArrowRight size={24} color={appColors.white} />}
                        iconFlex='right'
                        styles={{
                            width: '100%',
                        }}
                    />
                </SectionComponent>
                {errorMessage && (
                    <SectionComponent styles={{ marginTop: 10 }}>
                        <TextComponent styles={{ textAlign: 'center' }} text={errorMessage} color={appColors.warn} />
                    </SectionComponent> )
                }
                <SectionComponent styles={{ marginTop: 10 }}>
                    {time > 0 ? ( <RowComponent>
                        <TextComponent text='Resend code in ' styles={{
                            textAlign: 'center',
                        }} />
                        <TextComponent text={`00:${ time }`} styles={{
                            textAlign: 'center',
                            color: appColors.green,
                        }} />
                    </RowComponent> )
                        : ( <RowComponent>
                            <ButtonComponent type='link' text='Resend email verification'
                                onPress={handleResendVerification} />
                        </RowComponent> )}
                </SectionComponent>
                <LoadingModal visible={isLoading} />
            </BlankComponent>
        </LinearGradientComponent>

    )
}

export default VerificationScreen

const styles = StyleSheet.create( {
    input: {
        height: 55,
        width: 55,
        borderWidth: 1,
        borderColor: appColors.gray,
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: fontFamilies.bold,
    }
} )