import axios from "../axios";

const userLoginService = (data) => {
    return axios.post('/login', data);
}

const getAllUsers = (id) => {
    return axios.get(`/list/user?id=${id}`)
}

const fetchAllUserPagination = (page, limit) => {
    return axios.get(`/list/user?page=${page}&limit=${limit}`)
}

const createUsers = (data) => {
    return axios.post(`/create/user`, data)
}

const editUserById = (data) => {
    return axios.put(`/user/update`, data)
}

const deleteUserById = (user) => {
    return axios.delete(`/user/delete`, {
        data: { id: user.id }
    });
}

const fetchGroup = () => {
    return axios.get(`/list/group`);
}

const getUserAccount = () => {
    return axios.get(`/account`)
}

export {
    userLoginService,
    getAllUsers, createUsers, editUserById, deleteUserById, fetchAllUserPagination,
    fetchGroup, getUserAccount
}

