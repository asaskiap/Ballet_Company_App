import api from './api';

export const loadAnnouncements = async() => {
    const response = await api.get('/announcement/load');
    console.log(response.data);
    return response.data.announcements;
};
export const createAnnouncement = async(data) => {
    console.log('creating announcement in api', data);
    const response = await api.post('/announcement', data);
    const body = response.data;

    return body.announcement;
};

export const loadSingleAnnouncement = async(id) => {
    console.log(id);
    const response = await api.get(`/announcement/${id}`);
    const body = response.data;
    console.log(body);
    return body.announcement;
};

export const editAnnouncement = async(id, data) => {
    console.log(id);
    const response = await api.patch(`/announcement/${id}`, data);
    const body = response.data;
    console.log(body);
};

//update status on order
export const statusUpdateOrder = async(data, id) => {
    console.log(data);
    const response = await api.patch(`/orders/${id}/status`, data);
    const body = response.data;
    return body.order;
};

export const deleteAnnouncement = async(id) => {
    console.log('deleting announcement', id);
    await api.delete(`/announcement/${id}`);
    console.log('announcement deleted');
};