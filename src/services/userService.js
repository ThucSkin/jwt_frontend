import axios from "../axios";

const userLoginService = (data) => {
    return axios.post('/login', data);
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createUser = (data) => {
    return axios.post(`/create/user`, data)
}

export {
    userLoginService,
    getAllUsers, createUser
}

