import axios, {AxiosRequestConfig} from 'axios'
import NetInfo from '@react-native-community/netinfo'

interface OfflineError {
    isOffline:boolean;
    message:string;
    config?:AxiosRequestConfig;
}

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
    timeout:1000
})

api.interceptors.request.use(
    async config => {
        const state = await NetInfo.fetch();

        if(!state.isConnected){
            const error:OfflineError = {
                isOffline:true,
                message:"No Internet Connection",
                config
            };
            return Promise.reject(error)
        }

        return config;
    },
    error => Promise.reject(error)
);

export default api;