import api from "../Service/ApiService";
import ApiRoutes from "./ApiRoutes";

const getUserDetails = async ()=>{
    try {
        const response = await api.get(ApiRoutes.user_details.path, {authenticate: ApiRoutes.user_details.authenticate});
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export default getUserDetails;