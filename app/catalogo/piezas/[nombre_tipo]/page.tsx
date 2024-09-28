'use client';

import piezasApi from '@/app/libs/piezasApi';
import tiposApi from '@/app/libs/tiposApi';
import usosApi from '@/app/libs/usosApi';
import { useState, useEffect } from 'react';
import CatalogoItem from '@/app/components/CatalogoItem';

interface IParams {
	nombre_tipo: string;
}

const TipoPieza = ({ params }: { params: IParams }) => {
	let { nombre_tipo } = params;
	nombre_tipo = nombre_tipo.toUpperCase();

	const [piezas, setPiezas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [tiposPieza, setTiposPieza] = useState([]);
	const [usosPieza, setUsosPieza] = useState([]);

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);

	const fetchTipos = async () => {
		try {
			const response = await tiposApi.getAllTipos({});
			setTiposPieza(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const fetchUsos = async () => {
		try {
			const response = await usosApi.getAllUsos({});
			setUsosPieza(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const fetchPiezas = async () => {
		setLoading(true);
		try {
			const params = {
				page,
				pageSize,
				paginated: 1,
				activo: 1,
				with_pieza_usos: 1,
				with_pieza_tipos: 1,
				with_pieza_procedencias: 1,
				with_pieza_dimension: 1,
				with_modelos: 1,
				nombre_tipo: nombre_tipo.toUpperCase(),
			};
			const response = await piezasApi.getAllPiezas(params);
			console.log(response.data);
			setPiezas(response.data);
			setTotalPages(response.totalPages ?? 1);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchPiezas();
	}, []);

	return (
		<main className='bg-white text-black flex flex-col w-full'>
			<CatalogoItem
				piezas={piezas}
				page={page}
				setPage={setPage}
				pageSize={pageSize}
				totalPages={totalPages}
				usos={usosPieza}
				tipos={tiposPieza}
				nombre_tipo={nombre_tipo}
			/>
		</main>
	);
};

export default TipoPieza;
