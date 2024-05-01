import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';

interface Props
{
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}
const TextComponent = ( props: Props ) =>
{
  const { text, size, font, color, flex, styles, title } = props;
  return (
    <Text style={[
      globalStyles.text,
      {
        fontFamily: font ?? title ? fontFamilies.semiBold : fontFamilies.regular,
        fontSize: size ?? title ? 24 : 14,
        color: color ?? appColors.text,
        flex: flex ?? 0,
      },
      styles,
    ]}>{text}</Text>
  )
}

export default TextComponent