import axios from "axios";
import authHeader from "./auth-header";

const UPLOAD_FILE_URL = "http://localhost:8080/api/v1/upload-file";
const GET_FILES_INFORMATIONS_URL = "http://localhost:8080/api/v1/get-files-informations";
const GET_FILE_URL = "http://localhost:8080/api/v1/get-file-by-id?fileInformationId=";
const DELETE_FILE_URL = "http://localhost:8080/api/v1/delete-file-by-id?fileInformationId=";

const uploadFile = () => {
    return axios.post(UPLOAD_FILE_URL,{headers : authHeader()}).catch((error) =>  {throw new Error(error.response.data.message)});;
}

const getAllFilesInformations = () => {
    return axios.get(GET_FILES_INFORMATIONS_URL,{headers:authHeader()}).catch((error) =>  {throw new Error(error.response.data.message)});
}

const getFile = (fileInformationId) => {
    return axios.get(GET_FILE_URL+fileInformationId,{headers : authHeader()}).catch((error) =>  {throw new Error(error.response.data.message)});;
}

const deleteFile = (fileInformationId) => {
    return axios.delete(DELETE_FILE_URL+fileInformationId,{headers : authHeader()}).catch((error) =>  {throw new Error(error.response.data.message)});;
}


export default {uploadFile,getAllFilesInformations,getFile,deleteFile};