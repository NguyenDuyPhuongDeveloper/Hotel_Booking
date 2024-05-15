import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CircleComponent, RowComponent, TextComponent } from '../../components';
import { HambergerMenu, Notification } from 'iconsax-react-native';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';

const SearchScreen = ( { navigation, route }: any ) =>
{
    const { hotels, totalResults } = route.params;

    const renderItem = ( { item }: { item: any } ) => (
        <TouchableOpacity style={styles.hotelCard} onPress={() => navigation.navigate( 'HotelDetails', { hotel: item } )}>
            <Image source={{ uri: item.images[ 0 ] }} style={styles.hotelImage} />
            <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{item.name}</Text>
                <Text style={styles.hotelLocation}>{item.address}, {item.city}, {item.country}</Text>
                <View style={styles.hotelRatingContainer}>
                    <Text style={styles.hotelRating}>{item.rating} Points</Text>
                    <Text style={styles.hotelReviewCount}>({item.reviews} reviews)</Text>
                </View>
                <Text style={styles.hotelPrice}>${item.price} per night</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
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

            <View style={styles.container}>
                <Text style={styles.resultsCount}>{totalResults} hotels found</Text>
                <FlatList
                    data={hotels}
                    renderItem={renderItem}
                    keyExtractor={( item ) => item._id}
                    contentContainerStyle={styles.listContainer}
                />
            </View>

        </View >

    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    resultsCount: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 16,
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    hotelCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 16,
    },
    hotelImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    hotelInfo: {
        padding: 16,
    },
    hotelName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    hotelLocation: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    hotelRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    hotelRating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f90',
    },
    hotelReviewCount: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    hotelPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
} );

export default SearchScreen;