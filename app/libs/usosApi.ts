import axiosInstance from './axiosInstance';

const usosApi = {
	getAllUsos: (params: any) => axiosInstance.get('usos', { params }),
	getUsoById: (id: any) => axiosInstance.get(`usos/${id}`),
	createUso: (data: any) => axiosInstance.post('usos', data),
	updateUso: (id: any, data: any) => axiosInstance.put(`usos/${id}`, data),
	deleteUso: (id: any) => axiosInstance.delete(`usos/${id}`),
};

export default usosApi;
