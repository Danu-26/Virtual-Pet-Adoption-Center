import axios from 'axios';

const axiosInstance=axios.create({
    baseURL: "http://localhost:8000/petshop",
    headers:{
        "Content-Type":"application/json"
    }
})

const token = sessionStorage.getItem("token");
if(token){
    axiosInstance.defaults.headers.common["Authorization"]=`Bearer ${token}`;
}


export default axiosInstance;