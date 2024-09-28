'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface CatalogoItemProps {
	nombre_tipo: string;
	piezas: any[];
	usos: any[];
	tipos: any[];
	page: number;
	pageSize: number;
	totalPages: number;
	setPage: (page: number) => void;
}

function CatalogoItem({ nombre_tipo, piezas, usos, tipos, page, pageSize, totalPages, setPage }: CatalogoItemProps) {
	const [selectedImage, setSelectedImage] = useState(0);

	if (piezas.length === 0) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<h2 className='font-erode text-2xl text-black'>No hay piezas para mostrar</h2>
			</div>
		);
	}

	// Función para la flecha izquierda
	const handlePrevImage = () => {
		setSelectedImage((prev) => (prev === 0 ? piezas.length - 1 : prev - 1));
	};

	// Función para la flecha derecha
	const handleNextImage = () => {
		setSelectedImage((prev) => (prev === piezas.length - 1 ? 0 : prev + 1));
	};

	const currentPieza = piezas[selectedImage];

	// Lógica para las rutas dinámicas
	let prevPieza = '';
	let nextPieza = '';

	/* if (tipo === 'pieza') {
		if (nombrePieza === 'Cuencos') {
			prevPieza = 'Ollas';
			nextPieza = 'Figurinas';
		} else if (nombrePieza === 'Ollas') {
			prevPieza = 'Figurinas';
			nextPieza = 'Cuencos';
		} else if (nombrePieza === 'Figurinas') {
			prevPieza = 'Cuencos';
			nextPieza = 'Ollas';
		}
	} else if (tipo === 'uso') {
		if (nombrePieza === 'Ritual') {
			prevPieza = 'Ritual';
			nextPieza = 'Cotidiano';
		} else if (nombrePieza === 'Cotidiano') {
			prevPieza = 'Cotidiano';
			nextPieza = 'Ritual';
		}
	} */

	const prevLink =
		typeof tipos === 'string' && tipos === 'pieza'
			? `/catalogo/pieza/${prevPieza.toLowerCase()}`
			: `/catalogo/uso/${prevPieza.toLowerCase()}`;
	const nextLink =
		typeof tipos === 'string' && tipos === 'pieza'
			? `/catalogo/pieza/${nextPieza.toLowerCase()}`
			: `/catalogo/uso/${nextPieza.toLowerCase()}`;

	return (
		<div className='flex flex-col w-[100vw] my-20 space-y-10'>
			<div className='flex items-center px-10 md:px-40'>
				<Link href='/categorias'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 md:h-10 md:w-10 text-orange-500 mr-2 transform transition-transform duration-300 hover:scale-110'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
					</svg>
				</Link>
				<h2 className='font-erode text-black text-lg sm:text-2xl md:text-4xl mr-2'>Por tipo de {nombre_tipo}</h2>
				<span className='font-erode text-lg sm:text-2xl md:text-4xl text-black font-semibold'>
					{currentPieza.nombre_pieza}
				</span>
			</div>

			{/* Vista de una sola imagen para pantallas grandes */}
			<div className='hidden md:flex items-center'>
				{/* Flecha Izquierda */}
				<button
					onClick={handlePrevImage}
					className='absolute left-20 p-2 bg-gray-300 rounded-full hidden md:block transform transition-transform duration-300 hover:scale-125'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 text-gray-700'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
					</svg>
				</button>

				<div className='flex flex-col md:flex-row px-2 md:px-40 w-full space-x-0 md:space-x-2 space-y-20 md:space-y-0'>
					<img
						src={currentPieza.modelo[0].modelo_imagen.path_archivo}
						alt={currentPieza.nombre_pieza}
						className='flex w-full md:w-1/3 h-auto object-cover'
					/>
					<div className='flex w-full md:w-2/3'>
						{/* Aquí van los bloques de información */}
						<InfoBlock />
					</div>
				</div>

				{/* Flecha Derecha */}
				<button
					onClick={handleNextImage}
					className='absolute right-20 p-2 bg-gray-300 rounded-full hidden md:block transform transition-transform duration-300 hover:scale-125'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 text-gray-700'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
					</svg>
				</button>
			</div>

			{/* Vista de columna para pantallas pequeñas */}
			<div className='flex flex-col md:hidden px-5 space-y-10'>
				{piezas.map((pieza, index) => (
					<div key={index} className='flex flex-col items-center space-y-10'>
						<img
							src={pieza.modelo[0].modelo_imagen.path_archivo}
							alt={`Imagen ${index}`}
							className='w-full h-auto object-cover'
						/>
						<div className='flex w-full'>
							<InfoBlock />
						</div>
					</div>
				))}
			</div>

			{/* Barra de selección */}
			<div className='hidden md:flex space-x-2 justify-center border-t border-b border-gray-300'>
				{piezas.map((pieza, index) => (
					<div
						key={index}
						className={`p-2 cursor-pointer ${selectedImage === index ? 'bg-orange-500' : 'bg-gray-300'}`}
						onClick={() => setSelectedImage(index)}
					>
						<img
							src={pieza.modelo[1].modelo_imagen.path_archivo}
							alt={`Imagen ${index}`}
							className='h-20 w-20 object-contain'
						/>
					</div>
				))}
			</div>

			<div className='flex justify-between items-center w-full px-10 py-5'>
				{/* Flecha Izquierda con texto */}
				<Link href={prevLink}>
					<div className='flex items-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:text-orange-600'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 text-orange-500 mr-2'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
						</svg>
						<span className='font-erode text-xl sm:text-4xl text-black'>{prevPieza}</span>
					</div>
				</Link>

				{/* Flecha Derecha con texto */}
				<Link href={nextLink}>
					<div className='flex items-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:text-orange-600'>
						<span className='font-erode text-xl sm:text-4xl text-black'>{nextPieza}</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 text-orange-500 ml-2'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
						</svg>
					</div>
				</Link>
			</div>
		</div>
	);
}

function InfoBlock() {
	return (
		<>
			<div className='relative flex w-1/3 justify-center'>
				<div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
					<img src='/catalogo/simbolos/procedencia.png' alt='procedencia' className='w-full h-full ' />
				</div>
				<div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
					<span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>
						PROCEDENCIA
					</span>
					<span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
				</div>
			</div>
			<div className='relative flex w-1/3 justify-center'>
				<div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
					<img src='/catalogo/simbolos/uso.png' alt='procedencia' className='w-full h-full ' />
				</div>
				<div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
					<span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>USO</span>
					<span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
				</div>
			</div>
			<div className='relative flex w-1/3 justify-center'>
				<div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
					<img src='/catalogo/simbolos/medidas.png' alt='procedencia' className='w-full h-full ' />
				</div>
				<div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
					<span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>MEDIDAS</span>
					<span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
				</div>
			</div>
			{/* Puedes repetir este bloque para USO y MEDIDAS */}
		</>
	);
}

export default CatalogoItem;
