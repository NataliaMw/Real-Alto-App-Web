'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronRight, FaChevronLeft, FaArrowLeft } from 'react-icons/fa';

interface CatalogoItemProps {
	currentFilter: string;
	currentSubFilter: string;
	piezas: any[];
	usos: any[];
	tipos: any[];
	procedencias: any[];
	page: number;
	pageSize: number;
	totalPages: number;
	setPage: (page: number) => void;
}

interface InfoBlockProps {
	pieza: any;
}

function CatalogoItem({
	piezas,
	tipos,
	usos,
	procedencias,
	page,
	pageSize,
	totalPages,
	setPage,
	currentFilter,
	currentSubFilter,
}: CatalogoItemProps) {
	const [selectedImage, setSelectedImage] = useState(0);

	const handlePageChange = (newPage: number) => {
		if (newPage > totalPages) return;
		if (newPage <= 0) return;
		setPage(newPage);
	};

	if (piezas !== undefined && piezas.length === 0) {
		return (
			<div className='flex justify-center items-center h-[80vh] w-full'>
				<h2 className='font-erode text-4xl text-black'>No hay piezas para mostrar</h2>
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
	const currentSubFilterIndex =
		currentFilter === 'tipo'
			? tipos.findIndex((tipo) => tipo.nombre_tipo.toLowerCase() === currentSubFilter.toLowerCase())
			: currentFilter === 'uso'
			? usos.findIndex((uso) => uso.nombre_uso.toLowerCase() === currentSubFilter.toLowerCase())
			: currentFilter === 'procedencia'
			? procedencias.findIndex((procedencia) => procedencia.origen.toLowerCase() === currentSubFilter.toLowerCase())
			: 0;

	const currentData = currentFilter === 'tipo' ? tipos : currentFilter === 'uso' ? usos : procedencias;
	// Lógica para las rutas dinámicas
	const prevFilter =
		currentFilter === 'tipo'
			? currentSubFilterIndex > 0
				? currentData[currentSubFilterIndex - 1]?.nombre_tipo
				: currentData[currentData.length - 1]?.nombre_tipo
			: currentFilter === 'uso'
			? currentSubFilterIndex > 0
				? currentData[currentSubFilterIndex - 1]?.nombre_uso
				: currentData[currentData.length - 1]?.nombre_uso
			: currentFilter === 'procedencia'
			? currentSubFilterIndex > 0
				? currentData[currentSubFilterIndex - 1]?.origen +
				  '-' +
				  currentData[currentSubFilterIndex - 1]?.nivel_cronologico
				: currentData[currentData.length - 1]?.nombre_tipo +
				  '-' +
				  currentData[currentData.length - 1]?.nivel_cronologico
			: '';

	const nextFilter =
		currentFilter === 'tipo'
			? currentSubFilterIndex < currentData.length - 1
				? currentData[currentSubFilterIndex + 1]?.nombre_tipo
				: currentData[0]?.nombre_tipo
			: currentFilter === 'uso'
			? currentSubFilterIndex < currentData.length - 1
				? currentData[currentSubFilterIndex + 1]?.nombre_uso
				: currentData[0]?.nombre_uso
			: currentFilter === 'procedencia'
			? currentSubFilterIndex < currentData.length - 1
				? currentData[currentSubFilterIndex + 1]?.origen +
				  '-' +
				  currentData[currentSubFilterIndex + 1]?.nivel_cronologico
				: currentData[0]?.nombre_tipo + '-' + currentData[0]?.nivel_cronologico
			: '';

	const prevLink =
		prevFilter !== undefined && prevFilter !== null
			? `/catalogo/piezas/${currentFilter}/${prevFilter.toLowerCase()}`
			: '#';
	const nextLink =
		nextFilter !== undefined && nextFilter !== null
			? `/catalogo/piezas/${currentFilter}/${nextFilter.toLowerCase()}`
			: '#';
	return (
		<div className='flex flex-col w-[100vw] mt-10 space-y-10 h-full'>
			<div className='flex items-center w-full px-10 md:px-40'>
				<Link href='/categorias'>
					<FaArrowLeft
						size={26}
						className='text-orange-500 mr-2 transform transition-transform duration-300 hover:scale-110'
					/>
				</Link>
				<h2 className='font-erode text-black text-2xl md:text-4xl mx-2'>
					Por tipo de {currentFilter === 'tipo' ? 'pieza' : 'uso'}{' '}
					<span className='font-semibold'>{currentSubFilter.toUpperCase()}</span>
				</h2>
			</div>
			<div className='w-full text-center flex justify-center items-center'>
				<span className='font-erode text-2xl md:text-4xl text-black font-semibold'>
					{currentPieza.nombre_pieza.replace(/-/g, ' ')}
				</span>
			</div>

			{/* Vista de una sola imagen para pantallas grandes */}
			<div className='hidden md:flex items-center mt-2'>
				{/* Flecha Izquierda */}
				<button
					onClick={handlePrevImage}
					className='absolute left-20 p-2 bg-gray-300 rounded-full hidden md:block transform transition-transform duration-300 hover:scale-125'
				>
					<FaChevronLeft size={26} className='text-gray-700' />
				</button>

				<div className='grid grid-cols-12 md:flex-row px-2 md:px-40 w-full space-x-0 md:space-x-2 space-y-20 md:space-y-0 items-center'>
					<div className='flex col-span-3 w-full h-full items-center justify-center'>
						<Image
							src={currentPieza?.modelos[0]?.modelo_imagen?.path_archivo}
							alt={currentPieza?.nombre_pieza}
							width={350}
							height={350}
							className='object-cover'
						/>
					</div>
					<div className='col-span-9 w-full grid grid-cols-12 items-center justify-center gap-2 min-h-[300px] h-full'>
						{/* Aquí van los bloques de información */}
						<InfoBlock pieza={currentPieza} />
					</div>
				</div>

				{/* Flecha Derecha */}
				<button
					onClick={handleNextImage}
					className='absolute right-20 p-2 bg-gray-300 rounded-full hidden md:block transform transition-transform duration-300 hover:scale-125'
				>
					<FaChevronRight size={26} className='text-gray-700' />
				</button>
			</div>

			{/* Vista de columna para pantallas pequeñas */}
			<div className='grid grid-cols-12 md:hidden px-5 space-y-10 mt-2'>
				<div className='flex col-span-12 w-full h-full items-center justify-center min-h-[20vh]'>
					<Image
						src={currentPieza.modelos[0].modelo_imagen.path_archivo}
						alt={currentPieza.nombre_pieza}
						width={250}
						height={250}
						className='object-cover'
					/>
				</div>
				<div className='col-span-12 w-full grid grid-cols-12 items-center justify-center gap-2 min-h-[200px] h-fit'>
					{/* Aquí van los bloques de información */}
					<InfoBlock pieza={currentPieza} />
				</div>
			</div>

			{/* Barra de selección */}
			<div className='flex space-x-2 justify-center items-center border-t border-b border-gray-300 overflow-x-auto'>
				<button
					onClick={() => handlePageChange(page - 1)}
					disabled={page === 1}
					className='absolute left-10 p-2 bg-gray-200 rounded-full block transform transition-transform duration-300 hover:scale-125'
				>
					<FaChevronLeft size={20} className='text-orange-700' />
				</button>
				{piezas.map((pieza, index) => (
					<div
						key={index}
						className={`rounded-md p-2 cursor-pointer ${selectedImage === index ? 'bg-orange-500' : 'bg-gray-300'}`}
						onClick={() => setSelectedImage(index)}
					>
						<img
							src={pieza?.modelos[1]?.modelo_imagen?.path_archivo}
							alt={`Imagen ${index}`}
							className='h-20 w-20 object-contain'
						/>
					</div>
				))}
				<button
					onClick={() => handlePageChange(page + 1)}
					disabled={page >= totalPages}
					className='absolute right-10 p-2 bg-gray-200 rounded-full block transform transition-transform duration-300 hover:scale-125'
				>
					<FaChevronRight size={20} className='text-orange-700' />
				</button>
			</div>

			<div className='flex justify-between items-center w-full px-10 py-5 !my-12 h-full'>
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
						<span className='font-erode text-xl sm:text-4xl text-black'>{prevFilter}</span>
					</div>
				</Link>

				{/* Flecha Derecha con texto */}
				<Link href={nextLink}>
					<div className='flex items-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:text-orange-600'>
						<span className='font-erode text-xl sm:text-4xl text-black'>{nextFilter}</span>
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

function InfoBlock({ pieza }: InfoBlockProps) {
	return (
		<>
			<div className='relative flex col-span-4 h-full justify-center'>
				<div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
					<img src='/catalogo/simbolos/procedencia.png' alt='procedencia' className='w-full h-full ' />
				</div>
				<div className='flex flex-col h-full w-full bg-black rounded-lg p-5 sm:p-7 md:p-10 items-center space-y-2'>
					<span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg mt-5'>
						PROCEDENCIA
					</span>
					<span className='font-erode text-white text-xs sm:text-base w-full'>
						{pieza?.pieza_procedencias?.map((pieza_proc: any) => {
							let id = pieza_proc?.id_procedencia.toString().padStart(8, '0');
							id = 'P-' + id;
							const origen = pieza_proc?.procedencia?.origen;
							const nivel = pieza_proc?.procedencia?.nivel_cronologico;
							const periodo_inicio = pieza_proc?.procedencia?.periodo_inicio;
							const periodo_fin = pieza_proc?.procedencia?.periodo_fin;
							return (
								<div key={pieza_proc.id_pieza_procedencia} className='w-full text-center flex flex-col'>
									<p>{id}</p>
									<p>{origen.replace(/-/g, ' ') + ' - ' + nivel}</p>
									<p>
										{periodo_inicio} - {periodo_fin}
									</p>
								</div>
							);
						})}
					</span>
				</div>
			</div>
			<div className='relative flex col-span-4 h-full justify-center'>
				<div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
					<img src='/catalogo/simbolos/uso.png' alt='procedencia' className='w-full h-full ' />
				</div>
				<div className='flex flex-col h-full bg-black rounded-lg p-5 md:p-10 items-center space-y-2 w-full'>
					<span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg  mt-5'>
						USO
					</span>
					<span className='font-erode text-white text-xs sm:text-base'>
						{pieza?.pieza_usos?.map((piezauso: any) => {
							return (
								<div key={piezauso.id_pieza_procedencia} className='w-full text-center flex flex-col'>
									<p key={piezauso.id_pieza_uso}>{piezauso?.uso?.nombre_uso.replace(/-/g, ' ')}</p>
								</div>
							);
						})}
					</span>
				</div>
			</div>
			<div className='relative flex col-span-4 h-full justify-center'>
				<div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
					<img src='/catalogo/simbolos/medidas.png' alt='procedencia' className='w-full h-full ' />
				</div>
				<div className='flex flex-col h-full bg-black rounded-lg p-5 md:p-10 items-center space-y-2 w-full'>
					<span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg  mt-5'>
						MEDIDAS
					</span>
					<span className='font-erode text-white text-xs sm:text-base'>
						{pieza?.pieza_dimensiones?.map((pieza_dim: any) => {
							const unidad = pieza_dim?.dimensiones?.unidad_medida;
							const valor = pieza_dim?.dimensiones?.valor_medida;
							const descripcion = pieza_dim?.dimensiones?.descripcion;
							return (
								<div key={pieza_dim.id_pieza_procedencia} className='w-full text-center flex flex-col'>
									<p key={pieza_dim.id_pieza_dimension}>{descripcion + ': ± ' + valor + ' ' + unidad}</p>
								</div>
							);
						})}
					</span>
				</div>
			</div>
		</>
	);
}

export default CatalogoItem;
