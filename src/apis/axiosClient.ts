import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import querystring from "querystring";

const getAccessToken = async () =>
{
    const res = await AsyncStorage.getItem( 'auth' );
    return res ? JSON.parse( res ).accessToken : '';
}

const axiosClient = axios.create( {
    paramsSerializer: ( params ) => querystring.stringify( params ),
} );

axiosClient.interceptors.request.use( async ( config: any ) =>
{
    // const accesstoken = await getAccessToken();
    // console.log( 'accesstoken', accesstoken );
    config.headers = {
        Authorization: '',
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