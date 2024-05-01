import React from 'react';
import { DimensionValue, StyleProp, View, ViewStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';

interface Props
{
    title?: any;
    height?: DimensionValue;
    width?: DimensionValue;
    children: React.ReactNode;
    styles?: StyleProp<ViewStyle>;
}

const BlankComponent = ( props: Props ) =>
{
    const { title, height, width, children, styles } = props;
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
            <TextComponent title text={title} color={appColors.white}></TextComponent>
            <SpaceComponent height={10} />
            <View style={localStyle}>
                {children}
            </View>
        </View>
    )
}

export default BlankComponent