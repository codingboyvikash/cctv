import axiosInstance from './axiosInstance';

export const submitTicketApi = (payload) => axiosInstance.post('/customer/tickets', payload);
export const checkTicketStatusApi = (payload) => axiosInstance.post('/customer/tickets/status', payload);
export const submitContactApi = (payload) => axiosInstance.post('/customer/contact', payload);
export const adminLoginApi = (payload) => axiosInstance.post('/admin/login', payload);
export const getDashboardStatsApi = () => axiosInstance.get('/admin/dashboard/stats');
export const getTicketsApi = (params) => axiosInstance.get('/admin/tickets', { params });
export const getSingleTicketApi = (id) => axiosInstance.get(`/admin/tickets/${id}`);
export const updateTicketApi = (id, payload) => axiosInstance.put(`/admin/tickets/${id}`, payload);
