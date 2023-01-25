import axios from "axios";

const instance = axios.create({
    
    baseURL: "https://happybirthday-nq2v.onrender.com",
//     baseURL: "http://localhost:5001",
    
});

export default instance;
