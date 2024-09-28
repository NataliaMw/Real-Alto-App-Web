import axiosInstance from './axiosInstance';

const procedenciasApi = {
	getAllProcedencias: (params: any) => axiosInstance.get('procedencia', { params }),
	getProcedenciaById: (id: any) => axiosInstance.get(`procedencia/${id}`),
	createProcedencia: (data: any) => axiosInstance.post('procedencia', data),
	updateProcedencia: (id: any, data: any) => axiosInstance.put(`procedencia/${id}`, data),
	deleteProcedencia: (id: any) => axiosInstance.delete(`procedencia/${id}`),
};

export default procedenciasApi;
