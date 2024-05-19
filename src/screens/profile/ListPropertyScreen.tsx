import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LoadingModal } from '../../modals';
import { appColors } from '../../constants/appColors';
import hotelAPI from '../../apis/hotelApi';
import { BlankComponent, SectionComponent } from '../../components';
import { ImageLibraryOptions, MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const ListPropertyScreen = ( { navigation, route }: any ) =>
{
    const [ name, setName ] = useState( '' );
    const [ userId, setUserId ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ address, setAddress ] = useState( '' );
    const [ city, setCity ] = useState( '' );
    const [ country, setCountry ] = useState( '' );
    const [ amenities, setAmenities ] = useState( [ '' ] );
    const [ images, setImages ] = useState<string[]>( [] );
    const { getItem } = useAsyncStorage( 'auth' );
    const [ isLoading, setIsLoading ] = useState( false );

    useEffect( () =>
    {
        const initialize = async () =>
        {
            await checkLogin();
        };
        initialize();
    }, [] );

    const checkLogin = async () =>
    {
        const res = await getItem();
        if ( res )
        {
            const parsedRes = JSON.parse( res );
            setUserId( parsedRes.id );
        }
    };

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
            images,
        };
        const api = '/createHotel';
        try
        {
            const res = await hotelAPI.HandleHotel( api, data, 'post' );
            setIsLoading( false );
            console.log( 'Create hotel res', res );
            const hotelId = res.data.id;
            navigation.goBack();
            Alert.alert( 'Create hotel Successs', 'The hotel has been created!' );
        } catch ( error )
        {
            setIsLoading( false );
            Alert.alert( 'Error', 'The hotel name already exists, please try another one!' );
        }
    };

    const handleChoosePhotos = async () =>
    {
        try
        {
            await handleChangePhoto();
        } catch ( error )
        {
            console.error( 'Error picking images: ', error );
        }
    };

    const handleChangePhoto = async () =>
    {
        const options: ImageLibraryOptions = {
            mediaType: 'photo' as MediaType,
            selectionLimit: 0,
        };

        try
        {
            const result = await launchImageLibrary( options );
            if ( result.didCancel )
            {
                console.log( 'User cancelled image picker' );
            } else if ( result.errorCode )
            {
                console.log( 'ImagePicker Error: ', result.errorCode );
            } else if ( result.assets && result.assets.length > 0 )
            {
                const uploadedPhotos = await Promise.all(
                    result.assets.map( async ( asset ) =>
                    {
                        const fileUri = asset.uri;
                        if ( fileUri )
                        {
                            const photoUrl = await uploadImage( fileUri );
                            return photoUrl;
                        }
                        return '';
                    } )
                );
                setImages( [ ...images, ...uploadedPhotos ] );
            }
        } catch ( error )
        {
            console.error( 'Error picking images: ', error );
        }
    };

    const uploadImage = async ( fileUri: any ) =>
    {
        if ( !userId )
        {
            console.error( 'User ID is not set. Please check login.' );
            return '';
        }

        try
        {
            const reference = storage().ref( `images/hotels/${ userId }/${ Date.now() }.jpg` );
            const task = reference.putFile( fileUri );

            task.on( 'state_changed', ( taskSnapshot ) =>
            {
                console.log( `Uploaded ${ taskSnapshot.bytesTransferred } bytes out of ${ taskSnapshot.totalBytes }` );
            } );

            await task;
            const photoUrl = await reference.getDownloadURL();
            return photoUrl;
        } catch ( error )
        {
            console.error( 'Error uploading image:', error );
            return '';
        }
    };

    const addAmenity = () =>
    {
        setAmenities( [ ...amenities, '' ] );
    };

    const handleAmenityChange = ( text: any, rowIndex: any, columnIndex: any ) =>
    {
        const amenityIndex = rowIndex * 3 + columnIndex;
        const newAmenities = [ ...amenities ];
        newAmenities[ amenityIndex ] = text;
        setAmenities( newAmenities );
    };

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
                        <Button title="Choose Photos" onPress={handleChoosePhotos} />
                        {images.map( ( photoUrl, index ) => (
                            photoUrl ? (
                                <Image key={index} source={{ uri: photoUrl }} style={styles.photo} />
                            ) : null
                        ) )}
                    </SectionComponent>
                    <SectionComponent styles={styles.section}>
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
        borderColor: appColors.yellow,
    },
    tag: {
        backgroundColor: appColors.green2,
    },
    photo: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: 'transparent',
    },
} );

export default ListPropertyScreen;
