import api from './api';

export const updateProfile = async(data, id) => {
    console.log(data, id);
    const response = await api.patch(`profile/${id}/edit`, data);

    return response.data.user;
};

export const loadPersonalOrders = async(id) => {
    const response = await api.get(`/profile/${id}/orders`);
    return response.data.orders;
};

export const loadPersonalAnnouncements = async(id) => {
    const response = await api.get(`/profile/${id}/announcements`);
    return response.data.announcements;
};