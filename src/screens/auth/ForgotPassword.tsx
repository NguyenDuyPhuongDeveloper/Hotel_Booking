import { ArrowRight, Sms } from 'iconsax-react-native'
import React, { useState } from 'react'
import { BlankComponent, ButtonComponent, InputComponent, LinearGradientComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { Validate } from '../../utils/validate'
import { LoadingModal } from '../../modals'
import authenticationAPI from '../../apis/authApi'
import { Alert } from 'react-native'

const ForgotPassword = () =>
{
    const [ email, setEmail ] = useState( '' );
    const [ isDisabled, setIsDisabled ] = useState( true );
    const [ isLoading, setIsLoading ] = useState( false );

    const handleCheckEmail = () =>
    {
        const isValidEmail = Validate.email( email );
        setIsDisabled( !isValidEmail );
    }
    const handleForgotPassword = async () =>
    {
        setIsLoading( true );
        const api = '/forgotPassword';
        try
        {
            const res: any = await authenticationAPI.HandleAuthentication( api, { email }, 'post' );
            console.log( res );
            setIsLoading( false );
            Alert.alert( 'Send mail', 'We have sent an email including new password! ' );


        } catch ( error )
        {
            setIsLoading( false );
            console.log( `Can not create new password!,${ error }` );
        }
    }
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
                        onEnd={handleCheckEmail}
                    />
                </SectionComponent>
                <SpaceComponent height={10} />
                <SectionComponent styles={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    marginTop: 10,
                }}>
                    <ButtonComponent
                        onPress={handleForgotPassword}
                        disable={isDisabled}
                        type='primary'
                        text='Send'
                        icon={<ArrowRight size={24} color={appColors.white} />}
                        iconFlex='right'
                        styles={{
                            width: '100%',
                        }}
                    />
                </SectionComponent>
                <LoadingModal visible={isLoading} />
            </BlankComponent>
        </LinearGradientComponent>

    )
}

export default ForgotPassword