import { appInfos } from "../constants/appInfos";
import axiosClient from "./axiosClient";

class HotelAPI   
{
    HandleHotel = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) =>
    {
        return await axiosClient( `${ appInfos.BASE_URL }/hotel${ url }`, {
            method: method ?? 'get',
            data,
        } );
    };
}

const hotelAPI = new HotelAPI();
export default hotelAPI;