import api from "../Service/ApiService";
import ApiRoutes from "./ApiRoutes";

const uploadImage = async (image) =>{
    try {
        
        const formData = new FormData();
        formData.append("image", image);

        const response = await api.post(ApiRoutes.uploadImage.path, formData, {authenticate: ApiRoutes.uploadImage.authenticate});

        return response;
    } catch (error) {
        return error;
    }
}

export default uploadImage;