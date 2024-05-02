import React, { useState } from 'react'
import { Switch } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { BlankComponent, ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import LinearGradientComponent from '../../components/LinearGradientComponent'
import { appColors } from '../../constants/appColors'


const SigninScreen = () =>
{
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ isRemember, setIsRemember ] = useState( true );

    return (
        <LinearGradientComponent isBackground colors={[ '#00BD6B', '#2D6ADC' ]} >
            <BlankComponent
                title='Sign In' height={450} width='80%'
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
                        value={email}
                        prefix={<Feather name='mail' size={24} color={appColors.primary} />}
                        placeholder='Email'
                        onChange={val => setEmail( val )}
                        allowClear />
                    <InputComponent
                        value={password}
                        prefix={<Feather name='lock' size={24} color={appColors.primary} />}
                        placeholder='Password'
                        onChange={val => setPassword( val )}
                        allowClear
                        isPassword />
                    <RowComponent justify='space-between' >
                        <RowComponent>
                            <Switch value={isRemember} onChange={() => setIsRemember( !isRemember )} style={{ marginStart: -10 }} />
                            <TextComponent text='Remember me?' />
                        </RowComponent>
                        <ButtonComponent type='link' text='Forgot password?' textColor={appColors.warn} />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent type='primary' color={appColors.light_green} text="SIGN IN" styles={{ width: '100%' }} />
                </SectionComponent>
                <SectionComponent>
                    <RowComponent>
                        <TextComponent text='or Sign in by' />
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
                        <TextComponent text="Don't have an account? " />
                        <ButtonComponent type='link' text="Sign up" textColor={appColors.primary} />
                    </RowComponent>
                </SectionComponent>
            </BlankComponent>


        </LinearGradientComponent >
    )
}

export default SigninScreen