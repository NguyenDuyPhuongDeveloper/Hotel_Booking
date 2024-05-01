import React from 'react';
import { Platform, StyleProp, TextStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import TextComponent from './TextComponent';

interface Props
{
    text: string;
    size?: number;
    font?: string;
    color?: string;
    styles?: StyleProp<TextStyle>;
    height?: number;
    flex?: number;
}
const TitleComponent = ( props: Props ) =>
{
    const { text, size, font, color, styles, height, flex } = props;
    const weight: any =
        Platform.OS === 'ios'
            ? font
                ? {
                    fontWeight: font,
                }
                : { fontWeight: fontFamilies.bold }
            : {};
    return (
        <TextComponent
            size={size ?? 20}
            font={font ?? fontFamilies.semiBold}
            styles={[
                globalStyles.text,
                weight,
                {
                    fontFamily: font ?? fontFamilies.semiBold,
                    fontSize: size ?? 16,
                    lineHeight: height ? height : size ? size + 4 : 20,
                    color: color ?? appColors.text,
                    flex: flex ?? 0,
                },
                styles
            ]}
            color={color}
            text={text}
        />
    );
}

export default TitleComponent