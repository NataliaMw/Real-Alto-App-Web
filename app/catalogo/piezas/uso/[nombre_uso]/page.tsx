'use client';

import piezasApi from '@/app/libs/piezasApi';
import usosApi from '@/app/libs/usosApi';
import { useState, useEffect } from 'react';
import CatalogoItem from '@/app/components/CatalogoItem';
import Swal from 'sweetalert2';

interface IParams {
	nombre_uso: string;
}

const CatalogoUsoPieza = ({ params }: { params: IParams }) => {
	let { nombre_uso } = params;
	nombre_uso = nombre_uso.toUpperCase();

	const [piezas, setPiezas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [usosPieza, setUsosPieza] = useState([]);

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(1);

	const fetchUsos = async () => {
		try {
			const response = await usosApi.getAllUsos({});
			setUsosPieza(response);
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al cargar los usos',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
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
				nombre_uso: nombre_uso.toUpperCase(),
			};
			const response = await piezasApi.getAllPiezas(params);

			setPiezas(response.data);
			setTotalPages(response.totalPages);
			setLoading(false);
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al cargar las piezas',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			setLoading(false);
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchPiezas();
		fetchUsos();
	}, [page]);

	return (
		<main className='bg-white text-black flex flex-col w-full h-full'>
			<CatalogoItem
				piezas={piezas}
				page={page}
				setPage={setPage}
				pageSize={pageSize}
				totalPages={totalPages}
				usos={usosPieza}
				tipos={[]}
				procedencias={[]}
				currentFilter={'uso'}
				currentSubFilter={nombre_uso}
			/>
		</main>
	);
};

export default CatalogoUsoPieza;
