import axios from 'axios';
import { BASE_URL } from './apipaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers:{
        "Content-Type":"application/json",
        Accept: "application/json",
    },
});

//REquest Interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

//Response Interceptor

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        //Handle common errors globally
        if(error.response){
            if(error.response.status===401){
                //Redirect to login Page
                window.location.href ="/";
            }else if(error.response.status ===500){
                console.error("Server error. Please try again later.");
            }
        }
        else{
            console.error("Network error or no response received", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;