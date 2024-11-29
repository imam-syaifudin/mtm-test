import axios from 'axios';
import "dotenv/config";

const axiosInstance = axios.create({
    baseURL: process.env.OPEN_WEATHER_URL, 
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
        appid: process.env.OPEN_WEATHER_API_KEY
    }
});


export default axiosInstance;