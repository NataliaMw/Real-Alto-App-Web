const axios = require('axios');
const process = require('process');
require('dotenv').config();

const axiosInstance = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:5000',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

axiosInstance.interceptors.request.use(
	(config: any) => {
		//auth configurations to be made
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response: any) => {
		return response;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
