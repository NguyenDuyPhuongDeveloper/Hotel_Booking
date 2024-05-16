import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Map1 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import bookingAPI from '../../apis/bookingApi';
import roomAPI from '../../apis/roomApi';
import { RowComponent, SectionComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import { authSelector } from '../../redux/reducers/authReducer';

const HotelDetails = ( { navigation, route }: any ) =>
{
    const { hotel, searchParams } = route.params;
    const [ room, setRoom ] = useState<any>( null );
    const [ paymentMethod, setPaymentMethod ] = useState<string>( 'cash' );

    const [ price, setPrice ] = useState<any>( null );
    const [ uid, setUid ] = useState<any>();
    // console.log( 'hotel', hotel );
    const { getItem } = useAsyncStorage( 'auth' );
    const auth = useSelector( authSelector );
    const dispatch = useDispatch();
    const roomId = hotel.rooms;


    const getRoomDetails = async () =>
    {
        const api = `/getRoomDetails?uid=${ roomId }`;
        const res = await roomAPI.HandleRoom( api, null, 'get' );
        setRoom( res );
        setPrice( res.price );

    }
    const getUserId = async () =>
    {
        try
        {
            const res = await getItem();
            if ( res !== null )
            {
                const userData = JSON.parse( res );
                console.log( 'Get user information from HotelDetails', userData );
                setUid( userData.id );
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
        if ( roomId !== '' )
        {
            getRoomDetails();
            getUserId();
        }
    }, [ roomId ] );

    const handleBookRoom = async () =>
    {
        getUserId();
        console.log( 'uid', uid );
        const data = {
            hotelId: hotel._id,
            roomId: roomId,
            userId: uid,
            totalPrice: price,
            checkIn: searchParams.checkinDate,
            checkOut: searchParams.checkoutDate,
            paymentMethod: paymentMethod,
        }
        const api = '/createBooking';
        const res = await bookingAPI.HandleBooking( api, data, 'post' );
        const dataBooking = res.data;
        console.log( 'responsefromBooking-data', dataBooking );

        // Handle booking room action here
        console.log( 'Room booked!' );

        navigation.navigate( 'BookingScreen', { dataBooking } );
    };
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: hotel.images[ 0 ] }} style={styles.hotelImage} />
            <View style={styles.hotelInfo}>
                <TextComponent text={hotel.name} size={24} font={fontFamilies.semiBold} />
                <SectionComponent>
                    <RowComponent>
                        <Map1 color={appColors.primary} size={20} />
                        <TextComponent
                            text={`${ hotel.address }, ${ hotel.city }, ${ hotel.country }`}

                            color={appColors.green}
                            styles={{ marginLeft: 8 }}
                        />
                    </RowComponent>

                </SectionComponent>
                <RowComponent styles={{ marginTop: 16 }}>
                    <TextComponent text="Rating: " size={18} font={fontFamilies.semiBold} />
                    <TextComponent text={`${ hotel.rating } Points`} size={18} color={appColors.primary} />

                </RowComponent>
                <TextComponent text={`${ price } $ per night`} size={18} color={appColors.light_green} />
                <TextComponent text="Amenities" size={20} font={fontFamilies.semiBold} styles={{ marginTop: 24 }} />
                <View style={styles.amenitiesContainer}>
                    {hotel.amenities.map( ( amenity: string, index: number ) => (
                        <TextComponent key={index} text={amenity} size={16} color={appColors.green} styles={{ marginBottom: 8 }} />
                    ) )}
                </View>
                <TextComponent text="About" size={20} font={fontFamilies.semiBold} styles={{ marginTop: 24 }} />
                <TextComponent text={hotel.description} size={16} color={appColors.green} styles={{ marginTop: 8 }} />
                {room && (
                    <>
                        <TextComponent text="Room Details" size={20} font={fontFamilies.semiBold} styles={{ marginTop: 24 }} />
                        <TextComponent text={`Name: ${ room.name }`} size={16} color={appColors.green} styles={{ marginTop: 8 }} />
                        <TextComponent text={`Type: ${ room.type }`} size={16} color={appColors.green} styles={{ marginTop: 8 }} />
                    </>
                )}
                <View style={styles.paymentMethodContainer}>
                    <TextComponent text="Payment Method" size={20} font={fontFamilies.semiBold} styles={{ marginTop: 24 }} />
                    <View style={styles.paymentOptions}>
                        <TouchableOpacity style={[ styles.paymentOption, paymentMethod === 'cash' && styles.selectedPaymentOption ]} onPress={() => setPaymentMethod( 'cash' )}>
                            <TextComponent text="Cash" size={16} color={appColors.green} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[ styles.paymentOption, paymentMethod === 'card' && styles.selectedPaymentOption ]} onPress={() => setPaymentMethod( 'card' )}>
                            <TextComponent text="Card" size={16} color={appColors.green} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[ styles.paymentOption, paymentMethod === 'paypal' && styles.selectedPaymentOption ]} onPress={() => setPaymentMethod( 'paypal' )}>
                            <TextComponent text="Paypal" size={16} color={appColors.green} />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <TouchableOpacity style={styles.bookButton} onPress={handleBookRoom}>
                    <TextComponent text="Book Room" size={18} color={appColors.white} font={fontFamilies.semiBold} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: appColors.gray,
    },
    hotelImage: {
        width: '100%',
        height: 300,
    },
    hotelInfo: {
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: appColors.yellow,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    amenitiesContainer: {
        marginTop: 16,
    },
    bookButton: {
        backgroundColor: appColors.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    paymentMethodContainer: {
        marginTop: 24,
    },
    paymentOptions: {
        flexDirection: 'row',
        marginTop: 8,
    },
    paymentOption: {
        marginRight: 16,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    selectedPaymentOption: {
        backgroundColor: appColors.primary,
        borderColor: appColors.primary,
    },
} );

export default HotelDetails;