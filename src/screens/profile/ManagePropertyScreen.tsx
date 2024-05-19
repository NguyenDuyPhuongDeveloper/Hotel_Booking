import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Image, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { appColors } from '../../constants/appColors';
import hotelAPI from '../../apis/hotelApi';
import { BlankComponent, SectionComponent } from '../../components';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const ManagePropertyScreen = ( { navigation }: any ) =>
{
    const [ properties, setProperties ] = useState( [] );
    const [ userId, setUserId ] = useState( '' );
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

    useEffect( () =>
    {
        if ( userId )
        {
            fetchProperties();
        }
    }, [ userId ] );

    const checkLogin = async () =>
    {
        const res = await getItem();
        if ( res )
        {
            const parsedRes = JSON.parse( res );
            setUserId( parsedRes.id );
        }
    };

    const fetchProperties = async () =>
    {
        setIsLoading( true );
        const api = `/getHotels?uid=${ userId }`;
        try
        {
            const res = await hotelAPI.HandleHotel( api, null, 'get' );
            console.log( res.data );
            setProperties( res.data );
        } catch ( error )
        {
            console.error( error );
        } finally
        {
            setIsLoading( false );
        }
    };

    const handleCreateProperty = () =>
    {
        navigation.navigate( 'ListPropertyScreen', { userId } );
    };

    const renderProperty = ( { item }: any ) => (
        <SectionComponent styles={styles.propertyContainer}>
            <Image source={{ uri: item.images[ 0 ] }} style={styles.propertyImage} />
            <View style={styles.propertyDetails}>
                <Text style={styles.propertyName}>{item.name}</Text>
                <Text>{item.address}</Text>
                <Text>{item.city}, {item.country}</Text>
            </View>
        </SectionComponent>
    );

    return (
        <BlankComponent back title={'Manage Properties'} topBarColor={appColors.primary}>
            <FlatList
                data={properties}
                renderItem={renderProperty}
                keyExtractor={( item: any ) => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Button title="Create Property" onPress={handleCreateProperty} />
                    </View>
                }
                ListEmptyComponent={<Text>No properties found.</Text>}
                contentContainerStyle={styles.container}
            />
        </BlankComponent>
    );
};

const styles = StyleSheet.create( {
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: appColors.white,
    },
    header: {
        marginBottom: 20,
    },
    propertyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: appColors.yellow,
        marginBottom: 10,
    },
    propertyImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    propertyDetails: {
        flex: 1,
    },
    propertyName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
} );

export default ManagePropertyScreen;
