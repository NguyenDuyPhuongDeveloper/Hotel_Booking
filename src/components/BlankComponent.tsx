import { View, Text, StyleProp, DimensionValue } from 'react-native'
import React, { Children } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Props
{
    title?: any;
    height?: DimensionValue;
    width?: DimensionValue;
    children: React.ReactNode;
}

const BlankComponent = ( props: Props ) =>
{
    const { title, height, width, children } = props;
    const localStyle =
        [
            globalStyles.blank,
            {
                width: width ?? '50%',
                height: height ?? '50%',
            }
        ]
    return (
        <>
            <TextComponent title text={title} color={appColors.white} styles={{ paddingBottom: 10, marginStart: 0 }} />
            <View style={localStyle}>
                {children}
            </View>

        </>

    )
}

export default BlankComponent