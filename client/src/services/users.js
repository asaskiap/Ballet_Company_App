import api from './api';

export const loadUserList = async() => {
    const response = await api.get(`/userlist`);
    console.log(response.data);
    return response.data.users;
};