import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import userAPI from '../../apis/userApi'
import { BlankComponent, ButtonComponent, SectionComponent, TitleComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import { LoadingModal } from '../../modals'

const PartnerRegisterScreen = ( { navigation, route }: any ) =>
{
    const [ isLoading, setIsLoading ] = React.useState( false );
    const handleRegister = async () =>
    {
        const id = route.params.userId;

        setIsLoading( true );
        const data = {};
        const api = `/updateRole?uid=${ id }`;
        try
        {
            const res = await userAPI.HandleUser( api, data, 'put' );
            console.log( res );
            setIsLoading( false );
            Alert.alert( 'Partner Register', 'Register Success! ' );
            navigation.goBack();
            route.params.onGoBack();
        } catch ( error )
        {
            setIsLoading( false );
            console.log( error );
        }

    }
    return (
        <>
            <BlankComponent
                styles={{
                    padding: 24,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    flexDirection: 'column'
                }} back topBarColor={appColors.light_green} width='90%' height='20%'>
                <SectionComponent styles={{ alignItems: 'center' }}>
                    <TitleComponent styles={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} size={20} text='Partner Register' font={fontFamilies.bold} />
                </SectionComponent>

                <SectionComponent>
                    <ButtonComponent
                        text='Register'
                        type='primary'
                        styles={{ width: '100%' }}
                        color={appColors.primary}
                        onPress={handleRegister}
                    />
                </SectionComponent>
            </BlankComponent>
            <LoadingModal visible={isLoading} />
        </>
    )
}

export default PartnerRegisterScreen