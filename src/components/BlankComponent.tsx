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
                width: width ?? '100%',
                height: height ?? '100%',
            },

        ]
    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 30, paddingBottom: 10 }}>
            {( title || back ) && ( <RowComponent
                styles={{
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                    minWidth: 48,
                    minHeight: 48,
                    justifyContent: 'flex-start',
                    width: '100%',
                    borderWidth: 0.5,
                    borderColor: appColors.white,
                    borderRadius: 16,
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
            <SpaceComponent height={10} />
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={localStyle}>
                    {children}
                </View>
            </View>
        </View>
    )
}

export default BlankComponent