'use client';

import piezasApi from '@/app/libs/piezasApi';
import procedenciasApi from '@/app/libs/procedenciasApi';
import { useState, useEffect } from 'react';
import CatalogoItem from '@/app/components/CatalogoItem';
import CronologiaFase from '@/app/components/CronologiaFase';

interface IParams {
	origen: string;
}

const CatalogoProcedenciaPieza = ({ params }: { params: IParams }) => {
	const { origen } = params;

	const [piezas, setPiezas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [procedenciasPieza, setProcedenciasPieza] = useState([]);
	const [procedenciaInfo, setProcedenciaInfo] = useState([]);

	const fetchProcedencias = async () => {
		try {
			const response = await procedenciasApi.getAllProcedencias({
				only_origen: 1,
			});
			const piezaProcedencias = await procedenciasApi.getAllProcedencias({
				origen: origen,
			});
			setProcedenciasPieza(response);
			setProcedenciaInfo(piezaProcedencias);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const fetchPiezas = async () => {
		setLoading(true);
		try {
			const params = {
				activo: 1,
				with_pieza_usos: 1,
				with_pieza_tipos: 1,
				with_pieza_procedencias: 1,
				with_pieza_dimension: 1,
				with_modelos: 1,
				origen: origen,
			};
			const response = await piezasApi.getAllPiezas(params);
			setPiezas(response);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchPiezas();
		fetchProcedencias();
	}, []);

	return (
		<main className='bg-white text-black flex flex-col w-full h-full'>
			<CronologiaFase
				piezas={piezas}
				procedencias={procedenciasPieza}
				currentSubFilter={origen}
				currentProcedencia={procedenciaInfo}
			/>
		</main>
	);
};

export default CatalogoProcedenciaPieza;
