import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { globalStyles } from '../styles/globalStyles';

interface Props
{
    colors: string[];
    children?: ReactNode;
    isBackground?: boolean;
}

const LinearGradientComponent = ( props: Props ) =>
{
    const { colors, children, isBackground } = props;
    return isBackground ? (
        <LinearGradient colors={colors} style={[ globalStyles.container, { justifyContent: 'center', alignItems: 'center' } ]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: '100%' }} contentContainerStyle={globalStyles.scrollViewContent}>
                {children}
            </ScrollView>
        </LinearGradient>
    ) : ( <LinearGradient colors={colors} style={globalStyles.container}>
        <View style={globalStyles.container}>
            {children}
        </View>
    </LinearGradient> )
};
export default LinearGradientComponent;