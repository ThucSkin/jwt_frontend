import axios from 'axios';
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    //withCredentials: true
});


instance.interceptors.response.use(
    (response) => {
        // Xử lý phản hồi thành công và trả về dữ liệu (hoặc response.status nếu không có dữ liệu).
        return response.data ? response.data : { statusCode: response.status };
    },
    (error) => {
        // Xử lý lỗi và trả về một promise bị reject với thông tin lỗi.
        let res = {};
        if (error.response) {
            res.data = error.response.data;
            res.status = error.response.status;
            res.headers = error.response.headers;
        } else if (error.request) {
            // Xử lý trường hợp không có phản hồi từ máy chủ.
            console.log(error.request);
        } else {
            // Xử lý lỗi trong quá trình gửi yêu cầu.
            console.error("Error: ", error.message);
        }

        return Promise.reject(res);
    }
);



export default instance;
