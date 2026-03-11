import { useAuthStore } from "@/store/AuthStore";
import axios from "axios"
import { Alert } from "react-native";
import { Toast } from "toastify-react-native";


export const authApi = axios.create({
    baseURL:"https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/auth",
    timeout:10000
});

export const axiosInstance = axios.create({
    baseURL:"https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api",
    timeout:10000
})


axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
)

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    if (error.response) {
      const { status, data } = error.response;

      console.log("API ERROR:", status, data);

      if (status === 401 || status === 500 || status === 404) {
        console.log("Unauthorized user");
        //Toast.error(data.message || "Something Went Wrong")
      }

      // Return backend response instead of throwing
      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    if (error.response) {
      const { status, data } = error.response;

      console.log("API ERROR:", status, data);

      if (status === 401) {
        console.log("Unauthorized user");

        // optional logout
        // useAuthStore.getState().logout();
      }

      // Return backend response instead of throwing
      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  }
);