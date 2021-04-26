import api from './api';

export const loadCommentsByAnnouncement = async(id) => {
    const response = await api.get(`/comments/load/${id}`);
    return response.data.comments;
};
export const createComment = async(data) => {
    // data: content, announcement_id

    const response = await api.post('/comments', data);
    const body = response.data;

    return body.comment;
};

export const editComment = async(id, content) => {
    await api.patch(`/comments/${id}`, content);
};

export const deleteComment = async(id) => {
    await api.delete(`/comments/${id}`);
};