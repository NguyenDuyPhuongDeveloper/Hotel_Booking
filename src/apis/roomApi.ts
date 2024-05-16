import { appInfos } from "../constants/appInfos";
import axiosClient from "./axiosClient";

class RoomAPI   
{
    HandleRoom = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) =>
    {
        return await axiosClient( `${ appInfos.BASE_URL }/room${ url }`, {
            method: method ?? 'get',
            data,
        } );
    };
}

const roomAPI = new RoomAPI();
export default roomAPI;