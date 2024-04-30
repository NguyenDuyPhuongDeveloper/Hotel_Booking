import { View, Text, StyleProp } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../constants/fontFamilies';
import { appColors } from '../constants/appColors';
import { TextStyle } from 'react-native';

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
        fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
        fontSize: size ?? title ? 24 : 14,
        color: color ?? appColors.text,
        flex: flex ?? 0,
      },
      styles,
    ]}>{text}</Text>
  )
}

export default TextComponent