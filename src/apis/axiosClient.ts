import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import querystring from "querystring";
// const getAccessToken = async () =>
// {
//     try
//     {
//         const res = await AsyncStorage.getItem( 'auth' );
//         if ( res )
//         {
//             const { accessToken } = JSON.parse( res );
//             console.log( 'accessToken from AsyncStorage:', accessToken ); // Thêm dòng này
//             return accessToken;
//         }
//         return '';
//     } catch ( e )
//     {
//         console.error( "Failed to get the access token.", e );
//         return '';
//     }
// }

// const getAccessToken = async () =>
// {
//     const res = await AsyncStorage.getItem( 'auth' );
//     console.log( 'res', res );
//     const accessToken = res ? JSON.parse( res ).accessToken : '';
//     return accessToken;
// }
// const getAccessToken = async () =>
// {
//     try
//     {
//         const res = await AsyncStorage.getItem( 'auth' );
//         console.log( 'Raw token data from AsyncStorage:', res ); // Log dữ liệu thô
//         const parsedRes = res ? JSON.parse( res ) : null;
//         console.log( 'Parsed token data:', parsedRes ); // Log dữ liệu đã parse
//         return parsedRes ? parsedRes.accessToken : '';
//     } catch ( error )
//     {
//         console.error( 'Error reading token from AsyncStorage:', error );
//         return '';
//     }
// }


const axiosClient = axios.create( {
    paramsSerializer: ( params ) => querystring.stringify( params ),
} );

axiosClient.interceptors.request.use( async ( config: any ) =>
{
    // const accessToken = await getAccessToken();
    // console.log( 'accesstoken-axios', accessToken );
    config.headers = {
        Authorization: ``,
        Accept: 'application/json',
        ...config.headers,
    };
    config.data;
    return config;
} );

axiosClient.interceptors.response.use(
    ( res ) =>
    {
        if ( res.data && res.status === 200 )
        {
            return res.data;
        }
        throw new Error( 'Error' );
        return res;
    },
    error =>
    {
        console.log( `Error api ${ JSON.stringify( error ) }` );
        throw new Error( error.response )
    }
);

export default axiosClient;