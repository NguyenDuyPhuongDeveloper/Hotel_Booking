import axios from "axios"
import axiosClient from "./axiosClient"
import { appInfos } from "../constants/appInfos"

class AuthAPI   
{
    HandleAuthentication = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) =>
    {
        return await axiosClient( `${ appInfos.BASE_URL }/auth${ url }`, {
            method: method ?? 'get',
            data,
        } );
    };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;