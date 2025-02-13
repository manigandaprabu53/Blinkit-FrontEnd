import axios from "axios";
import config from "../Utils/config.js";
import ApiRoutes from "../Utils/ApiRoutes.jsx";

const api = axios.create({
    baseURL: config.BASE_URL,
    withCredentials: true
})

api.interceptors.request.use(async(config)=>{
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
}, (error)=>Promise.reject(error))


api.interceptors.request.use((response)=>{
    return response;
}, async (error)=>{
    let originRequest = error.config;
    
    if(error.response.status === 401 && !originRequest.retry){
        originRequest.retry = true;
        const refreshToken = localStorage.getItem("refreshToken");

        if(refreshToken){
            const newAccessToken = await refreshAccessToken(refreshToken);

            if(newAccessToken){
                originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originRequest);
            }
        }
    }

    return Promise.reject(error)
})

api.interceptors.response.use((response)=>{
    return response;
}, (error)=>{return Promise.reject(error)})



const refreshAccessToken = async (refreshToken)=>{
    try {
        const response = await api.put(ApiRoutes.refresh_token.path, {headers: {Authorization: `Bearer ${refreshToken}`}});
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken)
        return accessToken;
        
    } catch (error) {
        console.log(error);
        
    }
}

export default api;