'use client';
import { useEffect, useState } from 'react';
import piezasApi from '@/app/libs/piezasApi';
import usosApi from '@/app/libs/usosApi';
import tiposApi from '@/app/libs/tiposApi';
import procedenciasApi from '@/app/libs/procedenciasApi';

import { FiSlash, FiXCircle } from 'react-icons/fi';
import { FaTrash, FaEdit } from 'react-icons/fa';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CatalogoPiezas() {
	const router = useRouter();
	const [piezas, setPiezas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tiposPieza, setTiposPieza] = useState([]);

	const [filters, setFilters] = useState({
		nombre_tipo: '',
		busqueda: '',
	});

	const fetchPiezas = async () => {
		setLoading(true);
		try {
			const params = {
				...filters,
				activo: 1,
				with_pieza_tipos: 1,
				with_pieza_procedencias: 1,
				with_modelos: 1,
			};
			const response = await piezasApi.getAllPiezas(params);
			setPiezas(response);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
		}
	};

	const fetchTipos = async () => {
		try {
			const response = await tiposApi.getAllTipos({});
			setTiposPieza(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchPiezas();
		fetchTipos();
	}, [filters]);

	const resetFilters = () => {
		setFilters({
			nombre_tipo: '',
			busqueda: '',
		});
	};

	const emptyPiezas = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2 min-h-[50vh]'>
			<FiSlash size={42} />
			<h1 className='text-2xl font-semibold'>No se encontraron piezas</h1>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetFilters}>
				Borrar filtros
			</button>
		</div>
	);

	const errorPiezas = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2 min-h-[50vh]'>
			<FiXCircle size={42} />
			<h3 className='text-2xl font-semibold'>Error al cargar las piezas</h3>
			<p>{error}</p>
		</div>
	);

	const linkIcon = (tipo: string) => {
		const icon = tipo.toLowerCase();
		return `/catalogo/icons/${icon}.png`;
	};

	return (
		<main className='flex flex-col bg-white text-black w-full h-full min-h-[100vh]'>
			<div className='relative w-full h-[60vh]'>
				<Image
					src={'/catalogo/catalogo.png'}
					alt='Museo Real Alto'
					fill
					objectFit='cover'
					objectPosition='bottom'
					priority
				/>
				<div className='absolute bottom-0 left-0 right-0 bg-[#E67E22] text-white p-4 w-full md:w-[70vw] md:p-12 flex flex-row gap-6 items-center justify-between'>
					<div className='ml-12'>
						<h1 className='text-lg lg:text-3xl font-bold mb-2'>CATÁLOGO ARQUEOLÓGICO INTERACTIVO</h1>
						<h2 className='text-md lg:text-2xl'>DEL COMPLEJO CULTURAL REAL ALTO</h2>
					</div>
					<div></div>
					<div className='mr-12'>
						<Image src={'/catalogo-scroll.png'} alt='Scroll' width={100} height={100} className='object-contain' />
					</div>
				</div>
			</div>
			<div className='mx-6 mt-12 flex justify-center flex-col h-full'>
				{/* <!-- Filtros --> */}
				<div className='flex flex-row gap-6 items-center'>
					<h1 className='text-3xl ml-24 font-bold text-[#E67E22]'>FILTRO:</h1>
					{filters.nombre_tipo !== '' && (
						<button
							className='bg-white text-orange-700 font-bold py-2 px-4 rounded-md w-fit flex flex-row items-center justify-center gap-2 hover:bg-[#E67E22] hover:text-white'
							onClick={() => setFilters({ ...filters, nombre_tipo: '' })}
						>
							{filters.nombre_tipo} <FaTrash />
						</button>
					)}
				</div>
				<div className='flex flex-row gap-2 mt-6 items-center justify-center w-full'>
					<section className='flex flex-row mx-auto mb-6 w-full h-full gap-12 items-center justify-center overflow-x-auto'>
						{tiposPieza?.map((tipo: any, index) => (
							<div
								key={index}
								className={
									`border-4 p-2 border-[#E67E22] w-[150px] h-[150px] items-center flex flex-col rounded-md cursor-pointer hover:bg-[#FFDDBD] hover:font-semibold justify-between ` +
									(filters.nombre_tipo === tipo.nombre_tipo ? 'bg-[#FFDDBD]' : 'bg-white')
								}
								onClick={() => setFilters({ ...filters, nombre_tipo: tipo.nombre_tipo })}
							>
								<div className='h-full flex items-center'>
									<Image
										src={linkIcon(tipo.nombre_tipo)}
										alt=''
										width={80}
										height={80}
										objectFit='cover'
										className=''
									/>
								</div>
								<span className='h-fit w-full text-center'>{tipo.nombre_tipo ?? 'Sin tipo'}</span>
							</div>
						))}
					</section>
				</div>
				<hr className='my-2 border-[#E67E22] border-4' />

				{/* <!-- Catálogo --> */}
				{loading ? (
					emptyPiezas
				) : error ? (
					errorPiezas
				) : !loading && !error && piezas.length !== 0 ? (
					<div className='h-full my-2 shadow-md grid grid-cols-12 items-center justify-center w-full justify-items-center mt-2 mb-20 py-20'>
						{piezas.length !== 0 &&
							piezas.map((pieza: any, index) => (
								<Link
									href={`/catalogo/piezas/tipo/${filters.nombre_tipo}`}
									key={index}
									className='col-span-6 sm:col-span-4 md:col-span-3 w-fit h-full items-center justify-between flex flex-col cursor-pointer gap-2 shadow-md rounded-md
                                    hover:scale-105 transition transition-300 hover:shadow-lg'
								>
									<div className='h-full flex items-center justify-center w-full'>
										<Image
											src={pieza.modelos[0]?.modelo_imagen?.path_archivo}
											alt={pieza.nombre_pieza}
											width={350}
											height={350}
											objectFit='cover'
											className='aspect-w-3 aspect-h-4'
										/>
									</div>
									<div className='flex flex-col justify-center items-center h-fit w-fit text-center text-black'>
										<p className='text-center text-xl font-semibold'>{pieza.nombre_pieza}</p>
										<p className='text-center text-lg font-erode font-semibold'>
											{pieza.pieza_procedencias[0]?.procedencia?.periodo_inicio} -{' '}
											{pieza.pieza_procedencias[0]?.procedencia?.periodo_fin}
										</p>
										<p className='text-center text-lg font-erode text-truncate line-clamp'>
											{pieza.descripcion_corta.substr(0, 35) ?? 'Sin descripción'}{' '}
										</p>
									</div>
								</Link>
							))}
					</div>
				) : (
					emptyPiezas
				)}
			</div>
		</main>
	);
}
