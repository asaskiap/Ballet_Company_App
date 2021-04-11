import api from './api';

export const createOrder = async(data) => {
    console.log(data);
    const response = await api.post('/orders/create', data);
    const body = response.data;
    console.log(body);
};

export const loadSingleOrder = async(id) => {
    console.log(id);
    const response = await api.get(`/orders/${id}`);
    const body = response.data;
    return body.singleOrder;
};

export const editOrder = async(id, data) => {
    console.log(id);
    const response = await api.patch(`/orders/${id}`, data);
    const body = response.data.singleOrder;
    console.log(body);
};
export const listOrders = async() => {
    console.log('getting orders');
    const response = await api.get('/orders/list');
    const body = response.data;
    return body.orderList;
};

//update status on order
export const statusUpdateOrder = async(data, id) => {
    console.log(data);
    const response = await api.patch(`/orders/${id}/status`, data);
    const body = response.data;
    return body.order;
};

export const deleteOrder = async(id) => {
    console.log('deleting order', id);
    await api.delete(`/orders/${id}`);
    console.log('order deleted');
};