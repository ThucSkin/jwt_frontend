import axios from 'axios';
import { toast } from 'react-toastify';
require('dotenv').config();

const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const instance = axios.create({
    baseURL,
    withCredentials: true,
});


instance.interceptors.response.use(
    (response) => {
        // Xử lý phản hồi thành công và trả về dữ liệu (hoặc response.status nếu không có dữ liệu).
        return response.data;
    },
    (error) => {
        const status = error && error.response && error.response.status || 500;

        switch (status) {
            case 401: {
                toast.error('unauthorized user. Please login!');
                return error.response.data;
            }
            case 403: {
                toast.error(`You don't have the permission to access this resource`);
                return error.response.data;
            }
            case 400: {
                return Promise.reject(error);
            }
            case 409: {
                return Promise.reject(error);
            }

            default: {
                return Promise.reject(error);
            }
        }
    }
);

export default instance;
