import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { LoadingModal } from '../../modals';
import { appColors } from '../../constants/appColors';
import hotelAPI from '../../apis/hotelApi';
import { BlankComponent, SectionComponent } from '../../components';


const ListPropertyScreen = ( { navigation, route }: any ) =>
{
    const [ name, setName ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ address, setAddress ] = useState( '' );
    const [ city, setCity ] = useState( '' );
    const [ country, setCountry ] = useState( '' );
    const [ amenities, setAmenities ] = useState<string[]>( [ '' ] ); // Khởi tạo với một amenity trống

    const [ isLoading, setIsLoading ] = useState( false );

    const handleCreateHotel = async () =>
    {
        const id = route.params;
        setIsLoading( true );
        const data = {
            name,
            description,
            address,
            city,
            country,
            amenities,
            owner: id,
        };
        const api = '/createHotel';
        try
        {
            // Gọi API để tạo khách sạn
            console.log( 'Data:', data );
            const res = await hotelAPI.HandleHotel( api, data, 'post' );
            setIsLoading( false );
            console.log( 'Create hotel res', res );
            const hotelId = res.data.id;
            // Kiểm tra kết quả và chuyển sang màn hình tạo phòng

            // navigation.navigate( 'CreateRoomScreen', { hotelId: res.hotelId } );
        } catch ( error )
        {
            setIsLoading( false );
            Alert.alert( 'Error', 'The hotel name already exists, please try another one!' );
        }
    };

    const addAmenity = () =>
    {
        setAmenities( [ ...amenities, '' ] ); // Thêm một amenity trống vào danh sách
    };

    const handleAmenityChange = ( text: string, rowIndex: number, columnIndex: number ) =>
    {
        const amenityIndex = rowIndex * 3 + columnIndex;
        const newAmenities = [ ...amenities ];
        newAmenities[ amenityIndex ] = text;
        setAmenities( newAmenities );
    };

    // Tạo một helper function để chia amenities thành từng hàng có 3 items
    const splitAmenitiesIntoRows = () =>
    {
        const rows = [];
        for ( let i = 0; i < amenities.length; i += 3 )
        {
            const row = amenities.slice( i, i + 3 );
            rows.push( row );
        }
        return rows;
    };

    return (
        <>
            <BlankComponent back title={'Create your hotel'} topBarColor={appColors.primary}>
                <ScrollView contentContainerStyle={styles.container}>
                    <TextInput
                        label="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <TextInput
                        label="Address"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                    />
                    <TextInput
                        label="City"
                        value={city}
                        onChangeText={setCity}
                        style={styles.input}
                    />
                    <TextInput
                        label="Country"
                        value={country}
                        onChangeText={setCountry}
                        style={styles.input}
                    />
                    <SectionComponent styles={styles.section}>
                        {/* Hiển thị amenities theo từng hàng */}
                        {splitAmenitiesIntoRows().map( ( row, rowIndex ) => (
                            <View key={rowIndex} style={styles.row}>
                                {row.map( ( amenity, columnIndex ) => (
                                    <View key={columnIndex} style={styles.inputContainer}>
                                        <TextInput
                                            label={`Amenity ${ rowIndex * 3 + columnIndex + 1 }`}
                                            value={amenity}
                                            onChangeText={( text ) => handleAmenityChange( text, rowIndex, columnIndex )}
                                            style={styles.tag}
                                        />
                                    </View>
                                ) )}
                            </View>
                        ) )}
                        {/* Nút để thêm amenity mới */}
                        <Button title="Add Amenity" onPress={addAmenity} />
                    </SectionComponent>
                    <Button title="Create Hotel" onPress={handleCreateHotel} />
                </ScrollView>
            </BlankComponent>

            <LoadingModal visible={isLoading} />
        </>
    );
};

const styles = StyleSheet.create( {
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: appColors.white,
    },
    input: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    inputContainer: {
        flex: 1,
        marginRight: 10,
    },
    section: {
        padding: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: appColors.yellow

    },
    tag: {
        backgroundColor: appColors.green2,

    },
} );

export default ListPropertyScreen;
