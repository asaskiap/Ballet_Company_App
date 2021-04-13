import api from './api';

export const loadAnnouncements = async() => {
    console.log('getting announcements in api');
    const response = await api.get('/announcement/load');
    console.log(response.data);
    return response.data.announcements;
};
export const createAnnouncement = async(data) => {
    console.log('creating announcement in api', data);
    const response = await api.post('/announcement', data);
    const body = response.data;
    console.log(body.announcement);

    return body.announcement;
};

// export const loadSingleOrder = async(id) => {
//     console.log(id);
//     const response = await api.get(`/orders/${id}`);
//     const body = response.data;
//     return body.singleOrder;
// };

export const editAnnouncement = async(id, data) => {
    console.log(id);
    const response = await api.patch(`/announcements/${id}`, data);
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
    await api.delete(`/announcements/${id}`);
    console.log('announcement deleted');
};