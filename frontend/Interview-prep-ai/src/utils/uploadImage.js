import { API_PATHS } from "./apipaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async(imageFile)=>{
    const formData = new FormData();
    //Append image File to form Data

    formData.append('image',imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData,{
            headers:{
                'Content-Type': 'multipart/form-data', // Set header for file upload
            },
        });
        return response.data;// Return response data
    } catch (error) {
        console.error('Error uploading the image: ', error);
        throw error;// Rethrow errror for handling
        
    }
}

export default uploadImage; 