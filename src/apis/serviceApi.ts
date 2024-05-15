import { appInfos } from "../constants/appInfos";
import axiosClient from "./axiosClient";

class ServiceAPI
{
    HandleService = async (
        url: string,
        data?: any,
        method: 'get' | 'post' | 'put' | 'delete' = 'get',
    ) =>
    {
        const config: any = {
            method,
            url: `${ appInfos.BASE_URL }/service${ url }`,
        };

        if ( method === 'get' )
        {
            config.params = data;
        } else
        {
            config.data = data;
        }

        return await axiosClient( config );
    };
}

const serviceAPI = new ServiceAPI();
export default serviceAPI;
