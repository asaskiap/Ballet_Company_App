import api from './api';

export const loadAnnouncements = async() => {
    const response = await api.get('/announcement/load');
    return response.data.announcements;
};
export const createAnnouncement = async(data) => {
    console.log('creating announcement in api', data);
    const response = await api.post('/announcement', data);
    const body = response.data;

    return body.announcement;
};

export const loadSingleAnnouncement = async(id) => {
    const response = await api.get(`/announcement/${id}`);
    const body = response.data;
    return body.announcement;
};

export const editAnnouncement = async(id, data) => {
    const response = await api.patch(`/announcement/${id}`, data);
    const body = response.data;
    return body.announcement;
};

export const deleteAnnouncement = async(id) => {
    await api.delete(`/announcement/${id}`);
};