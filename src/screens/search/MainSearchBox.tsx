import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { appColors } from '../../constants/appColors';
import { ButtonComponent, RowComponent } from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LocationModal from './LocationModal';
import DateModal from './DateModal';
import GuestModal from './GuestModal';
import { LoadingModal } from '../../modals';
import serviceAPI from '../../apis/serviceApi';
import { useNavigation } from '@react-navigation/native';

const MainSearchBox = () =>
{
    const [ location, setLocation ] = useState( '' );
    const [ checkinDate, setCheckinDate ] = useState( new Date() );
    const [ checkoutDate, setCheckoutDate ] = useState( new Date() );
    const [ guests, setGuests ] = useState( 2 );
    const [ rooms, setRooms ] = useState( 1 );
    const [ children, setChildren ] = useState( 0 );
    const [ isLoading, setIsLoading ] = useState( false );

    const navigation: any = useNavigation();

    const [ showLocationModal, setShowLocationModal ] = useState( false );
    const [ showDateModal, setShowDateModal ] = useState( false );
    const [ showGuestModal, setShowGuestModal ] = useState( false );

    // Location Modal
    const openLocationModal = () =>
    {
        setShowLocationModal( true );
    };
    const handleLocationSelect = ( location: any ) =>
    {
        console.log( 'location', location );
        if ( location.adminName1 )
        {
            setLocation( `${ location.name }, ${ location.adminName1 }` );
        }
        else
        {
            setLocation( location );
        }


        setShowLocationModal( false );
    };
    const closeLocationModal = () =>
    {
        setShowLocationModal( false );
    };

    // Date Modal
    const openSelectDateModal = () =>
    {
        setShowDateModal( true );
    };
    const handleDateSelect = ( checkin: Date, checkout: Date ) =>
    {
        setCheckinDate( checkin );
        setCheckoutDate( checkout );
        console.log( 'checkin', checkinDate );
        console.log( 'checkout', checkoutDate );
        setShowDateModal( false );
    };
    const closeDateModal = () =>
    {
        setShowDateModal( false );
    };

    // Guests Modal
    const openGuestsModal = () =>
    {
        setShowGuestModal( true );
    };
    const handleGuestSelect = ( rooms: number, guests: number, children: number ) =>
    {
        setRooms( rooms );
        setGuests( guests );
        setChildren( children );
        setShowGuestModal( false );
    };
    const closeGuestModal = () =>
    {
        setShowGuestModal( false );
    };

    const searchHotels = async () =>
    {
        const api = '/searchHotels';
        setIsLoading( true );
        try
        {
            const searchParams = {
                location: location,
                checkinDate: checkinDate.toISOString(),
                checkoutDate: checkoutDate.toISOString(),
                guests: guests,
                rooms: rooms,
                child: children,
            };
            console.log( `searchParams= `, searchParams );
            const res = await serviceAPI.HandleService( api, searchParams, 'get' );
            console.log( `res= `, res );
            setIsLoading( false );
            navigation.navigate( 'SearchScreen', { hotels: res.data, totalResults: res.totalResults } );
        } catch ( error )
        {
            console.log( error );
            setIsLoading( false );
        }
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <RowComponent>
                        <AntDesign name="search1" size={24} color={appColors.black} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Location"
                            value={location}
                            onChangeText={setLocation}
                            onPressIn={openLocationModal}
                        />
                    </RowComponent>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <RowComponent>
                        <AntDesign name="calendar" size={24} color={appColors.black} />
                        <TextInput
                            style={styles.input}
                            placeholder={`${ checkinDate.toLocaleDateString() } - ${ checkoutDate.toLocaleDateString() }`}
                            onPressIn={openSelectDateModal}
                        />
                    </RowComponent>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <RowComponent>
                        <AntDesign name="user" size={24} color={appColors.black} />
                        <TextInput
                            style={styles.input}
                            placeholder={` ${ rooms } room, ${ guests } guests, ${ children } children`}
                            onChangeText={setLocation}
                            onPressIn={openGuestsModal}
                        />
                    </RowComponent>
                </TouchableOpacity>
                <ButtonComponent
                    type='primary'
                    text="Search"
                    onPress={searchHotels}
                    styles={{ width: '100%' }}
                />
            </View>

            <LocationModal visible={showLocationModal} onClose={closeLocationModal} onLocationSelect={handleLocationSelect} />
            <DateModal visible={showDateModal} onClose={closeDateModal} onDateSelect={handleDateSelect} />
            <GuestModal visible={showGuestModal} onClose={closeGuestModal} onGuestSelect={handleGuestSelect} />
            <LoadingModal visible={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        backgroundColor: appColors.white,
        borderRadius: 10,
        padding: 10,
        borderColor: appColors.yellow,
        borderWidth: 2,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: appColors.black,
    },
} );

export default MainSearchBox;
