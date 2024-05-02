import React, { useState } from 'react'
import { Switch } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BlankComponent, ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import LinearGradientComponent from '../../components/LinearGradientComponent'
import { appColors } from '../../constants/appColors'


const SignupScreen = () =>
{
    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ phone, setPhone ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ isRemember, setIsRemember ] = useState( true );

    return (
        <LinearGradientComponent isBackground colors={[ '#00BD6B', '#2D6ADC' ]} >
            <BlankComponent
                title='Sign up' height={550} width='80%'
                styles={{
                    padding: 24,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    justifyContent: 'flex-start',
                    alignContent: 'center',
                    flexDirection: 'column'
                }}>
                <SectionComponent styles={{ paddingTop: 20 }}>
                    <InputComponent
                        value={name}
                        prefix={<Ionicons name='person' size={24} color={appColors.primary} />}
                        placeholder='Full name'
                        onChange={val => setName( val )}
                        allowClear />
                    <InputComponent
                        value={email}
                        prefix={<Feather name='mail' size={24} color={appColors.primary} />}
                        placeholder='Email'
                        onChange={val => setEmail( val )}
                        allowClear />

                    <InputComponent
                        value={phone}
                        prefix={<Feather name='smartphone' size={24} color={appColors.primary} />}
                        placeholder='Phone number'
                        onChange={val => setPhone( val )}
                        allowClear />
                    <InputComponent
                        value={password}
                        prefix={<Feather name='lock' size={24} color={appColors.primary} />}
                        placeholder='Password'
                        onChange={val => setPassword( val )}
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
                        <ButtonComponent type='link' text="Sign in" textColor={appColors.primary} />
                    </RowComponent>
                </SectionComponent>
            </BlankComponent>
        </LinearGradientComponent >
    )
}

export default SignupScreen