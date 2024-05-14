import React, { useState } from 'react';
import { Modal, View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import serviceAPI from '../../apis/serviceApi';
import { TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';

interface Props
{
    visible: boolean,
    onClose: () => void,
    onLocationSelect: ( location: any ) => void,
}

const LocationModal = ( props: Props ) =>
{
    const { visible, onClose, onLocationSelect } = props;
    const [ searchTerm, setSearchTerm ] = useState( '' );
    const [ locations, setLocations ] = useState<any[]>( [] );

    const handleSearch = async ( value: string ) =>
    {
        setSearchTerm( value );
        try
        {
            // Encode the query parameter properly
            const encodedValue = encodeURIComponent( value );
            const res = await serviceAPI.HandleService( `/locations?query=${ encodedValue }`, {}, 'get' );
            setLocations( res.geonames );
        } catch ( err )
        {
            console.log( err );
            setLocations( [] );
        }
    };

    const handleLocationSelect = ( location: any ) =>
    {
        const selectedLocation = {
            id: location.geonameId,
            name: location.toponymName || location.name, // Tên phường
            countryName: location.countryName, // Tên đất nước
            adminName1: location.adminName1, // Tên thành phố (hoặc quận nếu là địa danh cấp thành phố)
            fcodeName: location.fcodeName, // Loại địa điểm (phường, quận, ...)
        };
        onLocationSelect( selectedLocation );
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter location"
                    value={searchTerm}
                    onChangeText={value => handleSearch( value )}
                />
                <FlatList
                    data={locations}
                    keyExtractor={( item ) => item.geonameId.toString()}
                    renderItem={( { item } ) => (
                        <TouchableOpacity style={styles.locationItem} onPress={() => handleLocationSelect( item )}>
                            <TextComponent
                                color={appColors.black}
                                text={`${ item.toponymName || item.name }, ${ item.adminName1 }, ${ item.countryName }`}
                            />
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.text}>CLOSE</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create( {
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: appColors.white,
    },
    searchInput: {
        borderWidth: 2,
        borderColor: appColors.yellow,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    locationItem: {
        padding: 10,
        borderBottomWidth: 0,
        borderBottomColor: '#ccc',
    },
    closeButton: {
        alignItems: 'center',
        width: '40%',
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: appColors.primary,
        borderRadius: 5,
    },
    text: {
        color: appColors.white,
        fontFamily: fontFamilies.bold,
    }
} );

export default LocationModal;   