import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BlankComponent, ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import LinearGradientComponent from '../../components/LinearGradientComponent'
import { appColors } from '../../constants/appColors'

const initValue = {
    username: '',
    email: '',
    phone: '',
    password: '',
}
const SignupScreen = ( { navigation }: any ) =>
{
    const [ values, setValues ] = useState( initValue )
    const [ isRemember, setIsRemember ] = useState( true );

    const handleChangeValue = ( key: string, value: string ) =>
    {
        const data: any = { ...values };
        data[ `${ key }` ] = value;
        setValues( data );

    }

    return (
        <LinearGradientComponent isBackground colors={[ '#00BD6B', '#2D6ADC' ]} >
            <BlankComponent back
                title='Sign up' height={550} width='90%'
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
                        allowClear />

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
                        isPassword />
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent type='primary' color={appColors.light_green} text="Sign up" styles={{ width: '100%' }} />
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
    )
}

export default SignupScreen