import { ArrowRight, Sms } from 'iconsax-react-native'
import React, { useState } from 'react'
import { BlankComponent, ButtonComponent, InputComponent, LinearGradientComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'


const initvalue = [ '0', '0', '0', '0' ];
const VerificationScreen = () =>
{
    const [ verificationCode, setVerificationCode ] = useState( initvalue );
    const handleInputChange = ( index: number, value: string ) =>
    {
        const updatedCode = [ ...verificationCode ];
        updatedCode[ index ] = value;
        setVerificationCode( updatedCode );
    };
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
                    <TextComponent text="We've sen you the verification code on +84 123456789" />
                    <SpaceComponent height={20} />
                    <RowComponent justify='space-around'>
                        <InputComponent placeholder='0' onChange={val => console.log( val )} />
                        <InputComponent placeholder='0' onChange={val => console.log( val )} />
                        <InputComponent placeholder='0' onChange={val => console.log( val )} />
                        <InputComponent placeholder='0' onChange={val => console.log( val )} />
                    </RowComponent>
                </SectionComponent>
                <SpaceComponent height={10} />
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

export default VerificationScreen