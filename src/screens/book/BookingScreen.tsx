import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { LoadingModal } from '../../modals';
import bookingAPI from '../../apis/bookingApi';
import LinearGradient from 'react-native-linear-gradient';
import { CircleComponent, RowComponent, TextComponent } from '../../components';
import { HambergerMenu, Notification } from 'iconsax-react-native';
import userAPI from '../../apis/userApi';

const BookingScreen = ( { navigation, route }: any ) =>
{
    const { getItem } = useAsyncStorage( 'auth' );
    const { dataBooking } = route.params || {};
    const [ userId, setUserId ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ isRefresh, setIsRefresh ] = useState( false );
    const [ bookings, setBookings ] = useState( [] );


    const [ bookingId, setBookingId ] = useState( '' );
    const [ checkIn, setCheckIn ] = useState( '' );
    const [ checkOut, setCheckOut ] = useState( '' );
    const [ hotelId, setHotelId ] = useState( '' );
    const [ roomId, setRoomId ] = useState( '' );
    const [ totalPrice, setTotalPrice ] = useState( 0 );

    const checkLogin = async () =>
    {
        const res = await getItem();
        if ( res )
        {
            const parsedRes = JSON.parse( res );
            setUserId( parsedRes.id );
        }
    };
    useEffect( () =>
    {
        const initialize = async () =>
        {
            await checkLogin();
        };
        initialize();
    }, [] );

    useEffect( () =>
    {
        if ( userId !== '' )
        {
            getUserInfo();
            getUserBookings();
            setIsRefresh( ( prev ) => !prev );
        }
    }, [ userId ] );

    const getUserInfo = async () =>
    {
        const api = `/getUserInfo?uid=${ userId }`;
        setIsLoading( true );
        try
        {
            const res = await userAPI.HandleUser( api, 'get' );
            console.log( "get user Booking Screen", res );

            setIsLoading( false );
        } catch ( error )
        {
            setIsLoading( false );
            console.log( error );
        }
    };



    const getUserBookings = async () =>
    {
        const api = `/getBookings?uid=${ userId }`;
        setIsLoading( true );
        try
        {
            const res = await bookingAPI.HandleBooking( api, null, 'get' );
            setBookings( res.bookings );
            console.log( 'User bookings:', res.bookings[ 0 ] );
            setBookingId( res.bookings[ 0 ].id );
            setCheckIn( res.bookings[ 0 ].checkIn );
            setCheckOut( res.bookings[ 0 ].checkOut );
            setHotelId( res.bookings[ 0 ].hotelId );
            setRoomId( res.bookings[ 0 ].roomId );
            setTotalPrice( res.bookings[ 0 ].totalPrice );
            setIsLoading( false );
        } catch ( error )
        {
            setIsLoading( false );
            console.log( 'Error getting user bookings:', error );
        }
    };
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
            <View style={styles.container}>
                <FlatList
                    data={bookings}
                    keyExtractor={( item: any ) => item.id}
                    renderItem={( { item } ) => (
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Booking ID:</Text>
                            <Text style={styles.value}>{item.id}</Text>

                            <Text style={styles.label}>Check-In:</Text>
                            <Text style={styles.value}>
                                {new Date( item.checkIn ).toLocaleString()}
                            </Text>

                            <Text style={styles.label}>Check-Out:</Text>
                            <Text style={styles.value}>
                                {new Date( item.checkOut ).toLocaleString()}
                            </Text>

                            <Text style={styles.label}>Hotel ID:</Text>
                            <Text style={styles.value}>{item.hotelId}</Text>

                            <Text style={styles.label}>Room ID:</Text>
                            <Text style={styles.value}>{item.roomId}</Text>

                            <Text style={styles.label}>Total Price:</Text>
                            <Text style={styles.value}>{item.totalPrice}</Text>
                        </View>
                    )}
                />
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
        borderColor: appColors.primary,
        borderWidth: 1,
        margin: 14
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