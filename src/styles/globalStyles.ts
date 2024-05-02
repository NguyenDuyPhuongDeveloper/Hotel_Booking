import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: fontFamilies.regular,
        color: appColors.text,
    },
    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
        paddingVertical: 12,
        // minHeight: 56,
        flexDirection: 'row',
    },
    shadow: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    blank: {
        backgroundColor: appColors.white,
        borderRadius: 16
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    inputContainer: {
        backgroundColor: appColors.white,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: appColors.line,
        borderWidth: 1
    },
} );