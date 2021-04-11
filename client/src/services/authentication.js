import api from './api';

export const signIn = async(data) => {
    console.log(data);
    const response = await api.post('/authentication/sign-in', data);
    const body = response.data;
    const user = body.user;
    return user;
};

export const signUp = async(data) => {
    console.log('signing up', data);
    const response = await api.post('/authentication/sign-up', data);
    const body = response.data;
    const user = body.user;
    return user;
};

export const signOut = async() => {
    await api.post('/authentication/sign-out');
};

export const verify = async() => {
    const response = await api.get('/authentication/verify');
    return response.data.user;
};

export const loadUser = async(id) => {
    const response = await api.get(`profile/${id}`);
    console.log(response);
    return response.data.individual;
};