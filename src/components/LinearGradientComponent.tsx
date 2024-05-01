import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { globalStyles } from '../styles/globalStyles';

interface Props
{
    colors: string[];
    children?: ReactNode;
}

const LinearGradientComponent = ( props: Props ) =>
{
    const { colors, children } = props;
    return (
        <LinearGradient colors={colors} style={globalStyles.container}>
            <View style={globalStyles.container}>
                {children}
            </View>
        </LinearGradient>
    );
};
export default LinearGradientComponent;