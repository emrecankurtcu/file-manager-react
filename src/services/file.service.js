import axios from "axios";
import authHeader from "./auth-header";
import uploadFileHeader from "./upload-file-header";

const UPLOAD_FILE_URL = "http://localhost:8080/api/v1/upload-file";
const GET_FILES_INFORMATIONS_URL = "http://localhost:8080/api/v1/get-files-informations";
const GET_FILE_URL = "http://localhost:8080/api/v1/get-file-by-id?fileInformationId=";
const DELETE_FILE_URL = "http://localhost:8080/api/v1/delete-file-by-id?fileInformationId=";

const uploadFile = (formData) => {
    return axios.post(UPLOAD_FILE_URL,formData,{headers : uploadFileHeader()}).then((response) => response).catch((error) =>  error.response);
}

const getAllFilesInformations = () => {
    return axios.get(GET_FILES_INFORMATIONS_URL,{headers:authHeader()}).then((response) => response).catch((error) =>  error.response);
}

const getFile = (fileInformationId) => {
    return axios.get(GET_FILE_URL+fileInformationId,{headers : authHeader(),responseType:"arraybuffer"}).then((response) =>  response).catch((error) =>  error.response);
}

const deleteFile = (fileInformationId) => {
    return axios.delete(DELETE_FILE_URL+fileInformationId,{headers : authHeader()}).then((response) => response).catch((error) =>  error.response);
}


export default {uploadFile,getAllFilesInformations,getFile,deleteFile};