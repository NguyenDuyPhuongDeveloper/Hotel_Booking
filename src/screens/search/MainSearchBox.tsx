import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { appColors } from '../../constants/appColors';
import { RowComponent } from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LocationModal from './LocationModal';

const MainSearchBox = () =>
{
    const [ location, setLocation ] = useState( '' );
    const [ checkinDate, setCheckinDate ] = useState( new Date() );
    const [ checkoutDate, setCheckoutDate ] = useState( new Date() );
    const [ guests, setGuests ] = useState( 2 );
    const [ rooms, setRooms ] = useState( 1 );
    const [ child, setChild ] = useState( 0 );

    const [ showLocationModal, setShowLocationModal ] = useState( false );
    const [ selectedLocation, setSelectedLocation ] = useState( null );


    const openLocationModal = () =>
    {
        setShowLocationModal( true );
    };
    const handleLocationSelect = ( location: any ) =>
    {
        setSelectedLocation( location );
        setLocation( `${ location.name }, ${ location.adminName1 } ` );
        console.log( 'selectedLocation', location );
        setShowLocationModal( false );
    };
    const closeLocationModal = () =>
    {
        setShowLocationModal( false );
    };

    const openSelectDateModal = () =>
    {

    };


    const openGuestsModal = () =>
    {

    };

    const searchHotels = () =>
    {
        // Thực hiện tìm kiếm và chuyển đến màn hình kết quả tìm kiếm
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={{ alignItems: 'center' }} >
                    <RowComponent>
                        <AntDesign name="search1" size={24} color={appColors.black} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập địa điểm"
                            value={location}
                            onChangeText={setLocation}
                            onPressIn={openLocationModal}
                        />
                    </RowComponent>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }} >
                    <RowComponent>
                        <AntDesign name="calendar" size={24} color={appColors.black} />
                        <TextInput
                            style={styles.input}
                            placeholder={`${ checkinDate.toLocaleDateString() } - ${ checkoutDate.toLocaleDateString() }`}
                            onPressIn={openSelectDateModal}
                        />
                    </RowComponent>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}  >
                    <RowComponent>
                        <AntDesign name="user" size={24} color={appColors.black} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập địa điểm"
                            value={` ${ rooms } room, ${ guests } guests, ${ child } children`}
                            onChangeText={setLocation}
                            onPressIn={openGuestsModal}
                        />
                    </RowComponent>
                </TouchableOpacity>
            </View>
            <LocationModal visible={showLocationModal} onClose={closeLocationModal} onLocationSelect={handleLocationSelect} />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        backgroundColor: appColors.white,
        borderRadius: 10,
        padding: 10,
        borderColor: appColors.yellow,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: appColors.black
    }
} );

export default MainSearchBox;