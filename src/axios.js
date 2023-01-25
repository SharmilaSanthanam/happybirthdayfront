import axios from "axios";

const instance = axios.create({
    
    // baseURL: "https://happybirthdayvenu.onrender.com",
    baseURL: "http://localhost:5001",
    
});

export default instance;