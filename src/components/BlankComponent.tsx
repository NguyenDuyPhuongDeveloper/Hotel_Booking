import React from 'react';
import { DimensionValue, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import { RowComponent } from '.';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';
import { fontFamilies } from '../constants/fontFamilies';

interface Props
{
    title?: any;
    height?: DimensionValue;
    width?: DimensionValue;
    children: React.ReactNode;
    back?: boolean;
    styles?: StyleProp<ViewStyle>;

}

const BlankComponent = ( props: Props ) =>
{
    const { title, height, width, children, styles, back } = props;
    const navigation: any = useNavigation();
    const localStyle =
        [
            globalStyles.blank,
            styles,
            {
                width: width ?? '50%',
                height: height ?? '50%',
            },

        ]
    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {( title || back ) && ( <RowComponent
                styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    minWidth: 48,
                    minHeight: 48,
                    justifyContent: 'flex-start',
                    width: '100%'

                }}>
                {back && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginRight: 12 }}>
                        <ArrowLeft size={24} color={appColors.white} />
                    </TouchableOpacity>
                )}
                {title ? (
                    <TextComponent title text={title} color={appColors.white}></TextComponent>
                ) : (
                    <></>
                )}
            </RowComponent> )}

            <SpaceComponent height={15} />
            <View style={localStyle}>
                {children}
            </View>
        </View>
    )
}

export default BlankComponent