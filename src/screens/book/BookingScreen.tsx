import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { LoadingModal } from '../../modals';
import bookingAPI from '../../apis/bookingApi';
import LinearGradient from 'react-native-linear-gradient';
import { CircleComponent, RowComponent, TextComponent } from '../../components';
import { HambergerMenu, Notification } from 'iconsax-react-native';

const BookingScreen = ( { navigation, route }: any ) =>
{
    const { getItem } = useAsyncStorage( 'auth' );
    const { dataBooking } = route.params || {};
    const [ userId, setUserId ] = useState<string>( '' );
    const [ isLoading, setIsLoading ] = useState( false );

    const getUserId = async () =>
    {
        try
        {
            const res = await getItem();
            if ( res !== null )
            {
                const userData = JSON.parse( res );
                console.log( 'Get user information dfdf ', userData );
                const { id } = userData.id;
                setUserId( id );
                console.log( 'User ID:', userId );
            } else
            {
                console.log( 'No data found in AsyncStorage' );
            }
        } catch ( error )
        {
            console.log( 'Error retrieving data from AsyncStorage:', error );
        }
    };

    useEffect( () =>
    {
        getUserId();
    }, [] );

    // Check if dataBooking is available
    if ( !dataBooking && !userId )
    {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <LinearGradient colors={[ '#00BD6B', '#2D6ADC' ]} style={{
                    height: 120,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    padding: StatusBar.currentHeight,
                }}>
                    <View style={{ paddingTop: 10 }}>
                        <RowComponent>
                            <TouchableOpacity>
                                <HambergerMenu color={appColors.white} size={30} />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <RowComponent>
                                    <TextComponent text="Yami Booking" color={appColors.white} size={24} font={fontFamilies.semiBold} />
                                </RowComponent>
                            </View>
                            <CircleComponent size={36} color={appColors.white}>
                                <View>
                                    <Notification color={appColors.primary} size={24} />
                                    <View style={{
                                        backgroundColor: appColors.warn,
                                        width: 10,
                                        height: 10,
                                        borderRadius: 30,
                                        borderWidth: 2,
                                        borderColor: appColors.white,
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                    }} />
                                </View>
                            </CircleComponent>
                        </RowComponent>
                    </View>
                </LinearGradient >
                <Text style={styles.noDataText}>No booking data available.</Text>
            </View>
        );
    }

    const getUserBookings = async () =>
    {
        const api = `/getBookings?uid=${ userId }`;
        setIsLoading( true );
        try
        {
            const res = await bookingAPI.HandleBooking( api, null, 'get' );
            console.log( 'User bookings:', res );
        } catch ( error )
        {
            setIsLoading( false );
            console.log( 'Error getting user bookings:', error );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={[ '#00BD6B', '#2D6ADC' ]} style={{
                height: 120,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: StatusBar.currentHeight,
            }}>
                <View style={{ paddingTop: 10 }}>
                    <RowComponent>
                        <TouchableOpacity>
                            <HambergerMenu color={appColors.white} size={30} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <RowComponent>
                                <TextComponent text="Yami Booking" color={appColors.white} size={24} font={fontFamilies.semiBold} />
                            </RowComponent>
                        </View>
                        <CircleComponent size={36} color={appColors.white}>
                            <View>
                                <Notification color={appColors.primary} size={24} />
                                <View style={{
                                    backgroundColor: appColors.warn,
                                    width: 10,
                                    height: 10,
                                    borderRadius: 30,
                                    borderWidth: 2,
                                    borderColor: appColors.white,
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }} />
                            </View>
                        </CircleComponent>
                    </RowComponent>
                </View>
            </LinearGradient >
            <RowComponent>
                <Text style={styles.title}>Booking Details</Text>
            </RowComponent>

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
            <LoadingModal visible={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
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