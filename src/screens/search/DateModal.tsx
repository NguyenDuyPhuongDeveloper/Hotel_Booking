import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { appColors } from '../../constants/appColors';

interface Props
{
    visible: boolean;
    onClose: () => void;
    onDateSelect: ( checkinDate: Date, checkoutDate: Date ) => void;
}

const DateModal = ( props: Props ) =>
{
    const { visible, onClose, onDateSelect } = props;
    const [ checkinDate, setCheckinDate ] = useState( new Date() );
    const [ checkoutDate, setCheckoutDate ] = useState( new Date() );
    const [ showCheckinPicker, setShowCheckinPicker ] = useState( false );
    const [ showCheckoutPicker, setShowCheckoutPicker ] = useState( false );

    const handleCheckinChange = ( event: any, selectedDate?: Date ) =>
    {
        const currentDate = selectedDate || checkinDate;
        setShowCheckinPicker( false );
        setCheckinDate( currentDate );
    };

    const handleCheckoutChange = ( event: any, selectedDate?: Date ) =>
    {
        const currentDate = selectedDate || checkoutDate;
        setShowCheckoutPicker( false );
        setCheckoutDate( currentDate );
    };

    const handleConfirm = () =>
    {
        onDateSelect( checkinDate, checkoutDate );
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <View style={styles.modalContainer} >
                    <Text style={styles.title}>Select Dates</Text>
                    <TouchableOpacity onPress={() => setShowCheckinPicker( true )}>
                        <Text style={styles.dateText}>Check-in Date: {checkinDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showCheckinPicker && (
                        <DateTimePicker
                            value={checkinDate}
                            mode="date"
                            display="default"
                            onChange={handleCheckinChange}
                        />
                    )}
                    <TouchableOpacity onPress={() => setShowCheckoutPicker( true )}>
                        <Text style={styles.dateText}>Check-out Date: {checkoutDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showCheckoutPicker && (
                        <DateTimePicker
                            value={checkoutDate}
                            mode="date"
                            display="default"
                            onChange={handleCheckoutChange}
                        />
                    )}
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
        borderRadius: 20,
        backgroundColor: appColors.white,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        marginBottom: 20,
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
    },
} );

export default DateModal;
