import axiosInstance from './axiosInstance';

const tiposApi = {
	getAllTipos: (params: any) => axiosInstance.get('tipos', { params }),
	getTipoById: (id: any) => axiosInstance.get(`tipos/${id}`),
	createTipo: (data: any) => axiosInstance.post('tipos', data),
	updateTipo: (id: any, data: any) => axiosInstance.put(`tipos/${id}`, data),
	deleteTipo: (id: any) => axiosInstance.delete(`tipos/${id}`),
};

export default tiposApi;
