import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';

const BookingScreen = ( { navigation, route }: any ) =>
{
    const { dataBooking } = route.params || {};
    console.log( dataBooking );

    // Check if dataBooking is available
    if ( !dataBooking )
    {
        return (
            <View style={styles.container}>
                <Text style={styles.noDataText}>No booking data available.</Text>
            </View>
        );
    }

    const getUserBookings = async () =>
    {


    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Booking Details</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Booking ID:</Text>
                    <Text style={styles.value}>{dataBooking.id}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Check-In:</Text>
                    <Text style={styles.value}>{new Date( dataBooking.checkIn ).toLocaleString()}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Check-Out:</Text>
                    <Text style={styles.value}>{new Date( dataBooking.checkOut ).toLocaleString()}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Hotel ID:</Text>
                    <Text style={styles.value}>{dataBooking.hotelId}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Room ID:</Text>
                    <Text style={styles.value}>{dataBooking.roomId}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Total Price:</Text>
                    <Text style={styles.value}>{dataBooking.totalPrice} $</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.value}>{dataBooking.userId}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: appColors.gray,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: fontFamilies.semiBold,
        color: appColors.primary,
        marginBottom: 16,
    },
    detailsContainer: {
        backgroundColor: appColors.white,
        padding: 16,
        borderRadius: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontFamily: fontFamilies.semiBold,
        color: appColors.primary,
    },
    value: {
        fontSize: 16,
        fontFamily: fontFamilies.regular,
        color: appColors.green,
    },
    noDataText: {
        fontSize: 18,
        fontFamily: fontFamilies.semiBold,
        color: appColors.primary,
        textAlign: 'center',
        marginTop: 24,
    },
} );

export default BookingScreen;