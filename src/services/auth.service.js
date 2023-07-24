import axios from "axios";

const LOGIN_URL = "http://localhost:8080/api/v1/login";

const login = (email, password) => {
    return axios
        .post(LOGIN_URL,{
            email,
            password
        })
        .then((response) => {
            if(response.data.jwt){
                localStorage.setItem("user",JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch((error) => {throw new Error(error.response.data.message)});
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export default {login,getCurrentUser,logout};