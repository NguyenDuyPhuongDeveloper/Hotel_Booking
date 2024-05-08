import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BlankComponent, ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import LinearGradientComponent from '../../components/LinearGradientComponent'
import { appColors } from '../../constants/appColors'
import { LoadingModal } from '../../modals'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface ErrorMessages
{
    email: string,
    password: string,
}

const initValue = {
    username: '',
    email: '',
    phone: '',
    password: '',
}
const SignupScreen = ( { navigation }: any ) =>
{
    const [ values, setValues ] = useState( initValue )
    const [ isLoading, setIsLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState<any>();
    const [ isDisabled, setIsDisabled ] = useState( true );

    useEffect( () =>
    {
        if ( !errorMessage ||
            ( errorMessage
                && ( errorMessage.email || errorMessage.password ) ) )
        {
            setIsDisabled( true );
        } else
        {
            setIsDisabled( false );
        }
    }, [ errorMessage ] );
    const dispatch = useDispatch();


    useEffect( () =>
    {
        if ( values.email || values.username || values.phone || values.password )
            setErrorMessage( '' );
    }, [ values.username, values.email, values.password, values.phone ] )

    const handleChangeValue = ( key: string, value: string ) =>
    {
        const data: any = { ...values };
        data[ `${ key }` ] = value;
        setValues( data );

    }
    const formValidator = ( key: string ) =>
    {
        const data = { ...errorMessage };
        let message = '';
        switch ( key )
        {
            case 'email':
                if ( !values.email ) { message = 'Email is required!' }
                else if ( !Validate.email( values.email ) ) { message = 'Email is invalid!' }
                else { message = '' };
                break;
            case 'password':
                if ( !values.password ) { message = 'Password is required!' }
                else { message = '' };
                break;
            default:
                break;
        }
        data[ `${ key }` ] = message;
        setErrorMessage( data );

    }
    const handleRegister = async () =>
    {
        const api = '/verification';
        try
        {
            const res = await authenticationAPI.HandleAuthentication( api, { email: values.email }, 'post' );
            console.log( res );
        } catch ( error )
        {
            console.log( error );
        }
        // const { username, email, phone, password } = values;
        // const emailValidation = Validate.email( values.email );
        // const passwordValidation = Validate.password( values.password );//not used yet

        // if ( username && email && phone && password )
        // {
        //     if ( emailValidation )
        //     {
        //         setErrorMessage( '' );
        //         setIsLoading( true );
        //         try
        //         {
        //             const res = await authenticationAPI.HandleAuthentication( '/register', values, 'post' );
        //             console.log( res );
        //             dispatch( addAuth( res.data ) );
        //             await AsyncStorage.setItem( 'auth', JSON.stringify( res.data ) );
        //             setIsLoading( false );
        //         } catch ( err )
        //         {
        //             console.log( err );
        //             setIsLoading( false );
        //         }
        //     }
        //     else
        //     {
        //         setErrorMessage( 'Email is invalid' );
        //     }

        // }
        // else
        // {
        //     setErrorMessage( 'Please fill all fields' );
        // }

    }

    return (
        <>
            <LinearGradientComponent isBackground colors={[ '#00BD6B', '#2D6ADC' ]} >
                <BlankComponent back
                    title='Sign up' height={600} width='90%'
                    styles={{
                        padding: 24,
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <SectionComponent styles={{ paddingTop: 20 }}>
                        <InputComponent
                            value={values.username}
                            prefix={<Ionicons name='person' size={24} color={appColors.primary} />}
                            placeholder='Full name'
                            onChange={val => handleChangeValue( 'username', val )}
                            allowClear />
                        <InputComponent
                            value={values.email}
                            prefix={<Feather name='mail' size={24} color={appColors.primary} />}
                            placeholder='Email'
                            onChange={val => handleChangeValue( 'email', val )}
                            allowClear
                            onEnd={() => formValidator( 'email' )} />

                        <InputComponent
                            value={values.phone}
                            prefix={<Feather name='smartphone' size={24} color={appColors.primary} />}
                            placeholder='Phone number'
                            onChange={val => handleChangeValue( 'phone', val )}
                            allowClear />
                        <InputComponent
                            value={values.password}
                            prefix={<Feather name='lock' size={24} color={appColors.primary} />}
                            placeholder='Password'
                            onChange={val => handleChangeValue( 'password', val )}
                            allowClear
                            isPassword
                            onEnd={() => formValidator( 'password' )} />
                    </SectionComponent>

                    {errorMessage && ( errorMessage.email || errorMessage.password ) && (
                        <SectionComponent>
                            {
                                Object.keys( errorMessage ).map( ( error, index ) =>
                                    errorMessage[ `${ error }` ] && (
                                        <TextComponent text={errorMessage[ `${ error }` ]} key={`error${ index }`} color={appColors.warn} />
                                    ) )
                            }
                        </SectionComponent>
                    )}

                    <SectionComponent>
                        <ButtonComponent disable={isDisabled} onPress={handleRegister} type='primary' text="Sign up" styles={{ width: '100%' }} />
                    </SectionComponent>
                    <SectionComponent>
                        <RowComponent>
                            <TextComponent text='or Sign up by' />
                        </RowComponent>
                        <SpaceComponent height={10} />
                        <RowComponent justify='center'>
                            <ButtonComponent type='primary' color={appColors.primary} text="Facebook" />
                            <ButtonComponent type='primary' color={appColors.google_logo} text="Google" />
                        </RowComponent>
                        <SpaceComponent height={10} />
                        <RowComponent>
                            <TextComponent text='By creating an account,' />
                        </RowComponent>
                        <RowComponent>
                            <TextComponent text='you fully agree to the ' />
                            <ButtonComponent type='link' text="Terms" textColor={appColors.light_green} />
                        </RowComponent>
                        <SpaceComponent height={20} />
                        <RowComponent>
                            <TextComponent text="Already have an account? " />
                            <ButtonComponent type='link' text="Sign in" onPress={() => navigation.navigate( 'SigninScreen' )} textColor={appColors.primary} />
                        </RowComponent>
                    </SectionComponent>
                </BlankComponent>
            </LinearGradientComponent >
            <LoadingModal visible={isLoading} />
        </>

    )
}

export default SignupScreen