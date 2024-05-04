import { ArrowRight, Sms } from 'iconsax-react-native'
import React, { useState } from 'react'
import { BlankComponent, ButtonComponent, InputComponent, LinearGradientComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'

const ForgotPassword = () =>
{
    const [ email, setEmail ] = useState( '' )
    return (
        <LinearGradientComponent isBackground colors={[ '#00BD6B', '#2D6ADC' ]} >
            <BlankComponent back title='Reset Password' height='90%' width='90%'
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
                    <TextComponent text='Please enter your email address to reset your password' />
                    <SpaceComponent height={20} />
                    <InputComponent
                        placeholder='abcd@gmail.com'
                        onChange={val => setEmail( val )}
                        prefix={<Sms size={24} color={appColors.primary} />}
                        allowClear
                    />
                </SectionComponent>
                <SpaceComponent height={20} />
                <SectionComponent styles={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    marginTop: 10,
                }}>
                    <ButtonComponent
                        type='primary'
                        text='Send'
                        icon={<ArrowRight size={24} color={appColors.white} />}
                        iconFlex='right'
                        styles={{
                            width: '100%',
                        }}
                    />
                </SectionComponent>
            </BlankComponent>
        </LinearGradientComponent>

    )
}

export default ForgotPassword