import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, View } from 'react-native';
import { ImageLibraryOptions, MediaType, launchImageLibrary } from 'react-native-image-picker';
import { Avatar, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import userAPI from '../../apis/userApi';
import { BlankComponent, SpaceComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { LoadingModal } from '../../modals';

const EditProfileScreen = ( { navigation, route }: any ) =>
{
    const { getItem } = useAsyncStorage( 'auth' );
    const dispatch = useDispatch();

    const [ userId, setUserId ] = useState( '' );
    const [ name, setName ] = useState( '' );
    const [ givenName, setGivenName ] = useState( '' );
    const [ familyName, setFamilyName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ phone, setPhone ] = useState( '' );
    const [ photo, setPhoto ] = useState<string>( '' );

    const [ isLoading, setIsLoading ] = useState( false );

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
        }
    }, [ userId ] );
    const uploadImage = async ( fileUri: any ) =>
    {
        try
        {
            // Tạo tham chiếu đến Storage
            const reference = storage().ref( `images/${ userId }/${ Date.now() }.jpg` );

            // Upload ảnh lên Storage
            const task = reference.putFile( fileUri );

            // Theo dõi tiến trình upload
            task.on( 'state_changed', ( taskSnapshot ) =>
            {
                console.log( `Uploaded ${ taskSnapshot.bytesTransferred } bytes out of ${ taskSnapshot.totalBytes }` );
            } );

            // Lấy đường dẫn của ảnh đã upload
            const url = await task;
            const photoUrl = await reference.getDownloadURL();

            // Cập nhật biến state photo với đường dẫn ảnh
            setPhoto( photoUrl );
        } catch ( error )
        {
            console.error( 'Error uploading image:', error );
        }
    };

    const handleChangePhoto = async () =>
    {
        const options: ImageLibraryOptions = {
            mediaType: 'photo' as MediaType,
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
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
                const source = { uri: result.assets[ 0 ].uri };
                if ( source.uri )
                {
                    setPhoto( source.uri );
                    console.log( source.uri );
                }
            }
            if ( result.assets && result.assets.length > 0 )
            {
                const fileUri = result.assets[ 0 ].uri;
                // Gọi hàm uploadImage với fileUri
                await uploadImage( fileUri );
            }
        } catch ( error )
        {
            console.error( 'Error picking image: ', error );
        }
    };

    const getUserInfo = async () =>
    {
        const api = `/getUserInfo?uid=${ userId }`;
        setIsLoading( true );
        try
        {
            const res = await userAPI.HandleUser( api, 'get' );
            setName( res.data.name );
            setGivenName( res.data.givenName );
            setFamilyName( res.data.familyName );
            setEmail( res.data.email );
            setPhone( res.data.phone );
            setPhoto( res.data.photo );
            setIsLoading( false );
        } catch ( error )
        {
            setIsLoading( false );
            console.log( error );
        }
    };

    const handleSave = async () =>
    {
        const api = `/updateInfo?uid=${ userId }`;
        setIsLoading( true );

        const data = { name, givenName, familyName, email, password, phone, photo };
        try
        {
            const res = await userAPI.HandleUser( api, data, 'put' );
            console.log( res );
            setIsLoading( false );
            Alert.alert( 'Update Infomation', 'Your information has been updated! ' );
            navigation.goBack();
            route.params.onGoBack();
        } catch ( error )
        {
            setIsLoading( false );
            console.log( error );
        }

    };

    return (
        <>
            <BlankComponent back topBarColor={appColors.primary}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                    <View style={styles.photoContainer}>
                        <Avatar.Image size={150} source={{ uri: photo || 'https://via.placeholder.com/150' }} />
                        <SpaceComponent height={10} />
                        <Button title="Change Photo" onPress={handleChangePhoto} />
                    </View>
                    <TextInput
                        label="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Given Name"
                        value={givenName}
                        onChangeText={setGivenName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Family Name"
                        value={familyName}
                        onChangeText={setFamilyName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        label="New Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        label="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        style={styles.input}
                    />
                    <Button title="Save" onPress={handleSave} />
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
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
} );

export default EditProfileScreen;
