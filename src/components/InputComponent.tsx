import React, { ReactNode, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TitleComponent from './TitleComponent';


interface Props
{
    value?: string;
    onChange: ( val: string ) => void;
    placeholder?: string;
    title?: string;
    prefix?: ReactNode;
    affix?: ReactNode;
    allowClear?: boolean;
    multiple?: boolean;
    numberOfLines?: number;
    isPassword?: boolean;
    onEnd?: () => void;
}
const InputComponent = ( props: Props ) =>
{
    const { value, onChange, placeholder, title, prefix, affix, allowClear, multiple, numberOfLines, isPassword, onEnd } = props;
    const [ showPass, setShowPass ] = useState( false );
    return (
        <View style={{ marginBottom: 16 }}>
            {title && <TitleComponent text={title} />}
            <RowComponent styles={[
                globalStyles.inputContainer,
                {
                    marginTop: title ? 8 : 0,
                    minHeight: multiple && numberOfLines ? 32 * numberOfLines : 32,
                    paddingVertical: 14,
                    paddingHorizontal: 10,
                    alignItems: multiple && numberOfLines ? 'flex-start' : 'center',

                },
            ]}>
                {prefix && prefix}
                <View style={{ flex: 1, paddingLeft: prefix ? 8 : 0, paddingRight: affix ? 8 : 0 }}>
                    <TextInput
                        style={[
                            globalStyles.text,
                            {
                                margin: 0,
                                padding: 0,
                                paddingVertical: 0,
                                flex: 0,
                            } ]}
                        value={value}
                        onChangeText={val => onChange( val )}
                        placeholder={placeholder ?? ''}
                        placeholderTextColor={'#676767'}
                        multiline={multiple}
                        numberOfLines={numberOfLines}
                        secureTextEntry={isPassword ? !showPass : false}
                        autoCapitalize='none'
                        onEndEditing={onEnd}
                    />
                </View>
                {affix && affix}
                {allowClear && value && (
                    <TouchableOpacity onPress={() => onChange( '' )}>
                        <AntDesign name="close" size={20} color={appColors.primary} />
                    </TouchableOpacity>
                )}
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPass( !showPass )}>
                        <AntDesign name={showPass ? 'eye' : 'eyeo'} size={20} color={appColors.primary} />
                    </TouchableOpacity>
                )}
            </RowComponent>
        </View>
    )
}

export default InputComponent