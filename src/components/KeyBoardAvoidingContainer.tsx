import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const KeyboardAvoidingContainer = ( { children }: any ) =>
{
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'coral' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
            >
                <ScrollView>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default KeyboardAvoidingContainer