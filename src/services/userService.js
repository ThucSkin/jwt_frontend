import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createUser = (data) => {
    return axios.post(`/create/user`, data)
}

export {
    handleLoginApi,
    getAllUsers, createUser
}

