import { appInfos } from "../constants/appInfos";
import axiosClient from "./axiosClient";

class BookingAPI   
{
    HandleBooking = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) =>
    {
        return await axiosClient( `${ appInfos.BASE_URL }/booking${ url }`, {
            method: method ?? 'get',
            data,
        } );
    };
}

const bookingAPI = new BookingAPI();
export default bookingAPI;