
export default function uploadFileHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if(user && user.jwt){
        return { "Authorization" : "Bearer "+user.jwt ,"Content-Type":"multipart/form-data"}
    } else {
        return {};
    }
    
}