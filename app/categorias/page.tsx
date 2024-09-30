'use client';

import Categorias from '../components/Categorias';
import UsoPieza from '../components/UsoPieza';
import Cronologia from '../components/Cronologia';
import TipoPieza from '../components/TipoPieza';
import tiposApi from '@/app/libs/tiposApi';
import usosApi from '@/app/libs/usosApi';
import procedenciasApi from '@/app/libs/procedenciasApi';
import React, { useState, useEffect } from 'react';

export default function CatalogoPage() {
	const [tipos, setTipos] = useState([]);
	const [usos, setUsos] = useState([]);
	const [procedencias, setProcedencias] = useState([]);

	const [error, setError] = useState([]);

	const fetchTipos = async () => {
		try {
			const response = await tiposApi.getAllTipos({});
			setTipos(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const fetchUsos = async () => {
		try {
			const response = await usosApi.getAllUsos({});
			setUsos(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const fetchProcedencias = async () => {
		try {
			const response = await procedenciasApi.getAllProcedencias({
				origen: 'VALDIVIA',
			});
			setProcedencias(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchTipos();
		fetchProcedencias();
		fetchUsos();
	}, []);

	return (
		<main className='flex flex-col bg-white'>
			<Categorias />
			<TipoPieza data={tipos} />
			<UsoPieza data={usos} />
			<Cronologia data={procedencias} />
		</main>
	);
}
