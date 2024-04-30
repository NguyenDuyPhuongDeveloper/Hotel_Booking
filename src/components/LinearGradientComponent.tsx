import React, { Children, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props
{
    colors: string[];
    children?: ReactNode;
}

const LinearGradientComponent = ( props: Props ) =>
{
    const { colors, children } = props;
    return (
        <LinearGradient colors={colors} style={styles.container1}>
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create( {
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );

export default LinearGradientComponent;