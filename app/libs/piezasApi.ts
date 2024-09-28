import axiosInstance from './axiosInstance';

const piezasApi = {
	getAllPiezas: (params: any) => axiosInstance.get('piezas', { params }),
	getPiezaById: (id: any) => axiosInstance.get(`piezas/${id}`),
	createPieza: (data: any) => axiosInstance.post('piezas', data),
	updatePieza: (id: any, data: any) => axiosInstance.put(`piezas/${id}`, data),
	deletePieza: (id: any) => axiosInstance.delete(`piezas/${id}`),
};

export default piezasApi;
