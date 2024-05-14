import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';

interface Props
{
    visible: boolean;
    onClose: () => void;
    onGuestSelect: ( rooms: number, guests: number, children: number ) => void;
}

const GuestModal = ( props: Props ) =>
{
    const { visible, onClose, onGuestSelect } = props;
    const [ rooms, setRooms ] = useState( 1 );
    const [ guests, setGuests ] = useState( 2 );
    const [ children, setChildren ] = useState( 0 );

    const handleConfirm = () =>
    {
        onGuestSelect( rooms, guests, children );
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Select Guests and Rooms</Text>

                    <View style={styles.selectorContainer}>
                        <Text style={styles.label}>Rooms</Text>
                        <View style={styles.counter}>
                            <TouchableOpacity onPress={() => setRooms( Math.max( 1, rooms - 1 ) )}>
                                <Text style={styles.counterButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterValue}>{rooms}</Text>
                            <TouchableOpacity onPress={() => setRooms( rooms + 1 )}>
                                <Text style={styles.counterButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.selectorContainer}>
                        <Text style={styles.label}>Guests</Text>
                        <View style={styles.counter}>
                            <TouchableOpacity onPress={() => setGuests( Math.max( 1, guests - 1 ) )}>
                                <Text style={styles.counterButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterValue}>{guests}</Text>
                            <TouchableOpacity onPress={() => setGuests( guests + 1 )}>
                                <Text style={styles.counterButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.selectorContainer}>
                        <Text style={styles.label}>Children</Text>
                        <View style={styles.counter}>
                            <TouchableOpacity onPress={() => setChildren( Math.max( 0, children - 1 ) )}>
                                <Text style={styles.counterButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterValue}>{children}</Text>
                            <TouchableOpacity onPress={() => setChildren( children + 1 )}>
                                <Text style={styles.counterButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create( {
    modalContainer: {
        padding: 20,
        margin: 20,
        width: '90%',
        height: '50%',  // Set height to 70%
        borderRadius: 20,
        backgroundColor: appColors.white,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: fontFamilies.bold,
        color: appColors.text,
    },
    selectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontFamily: fontFamilies.regular,
        color: appColors.text,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        color: appColors.text,

    },
    counterButton: {
        fontSize: 24,
        width: 30,
        textAlign: 'center',

    },
    counterValue: {
        fontSize: 18,
        marginHorizontal: 10,
        color: appColors.text,
    },
    confirmButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: appColors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: appColors.red,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fontFamilies.semiBold,
    },
} );

export default GuestModal;
