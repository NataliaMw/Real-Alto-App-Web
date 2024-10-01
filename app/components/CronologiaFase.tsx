import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface CronologiaFaseProps {
	currentSubFilter: string;
	procedencias: any[];
	piezas: any[];
	currentProcedencia: any[];
}

function CronologiaFase({ currentSubFilter, procedencias, piezas, currentProcedencia }: CronologiaFaseProps) {
	const getLink = (index: any) => {
		const nombre_pieza = piezas[index]?.nombre_pieza ?? '';
		return '/catalogo/piezas?nombre_pieza=' + nombre_pieza.toLowerCase();
	};
	if (piezas !== undefined && piezas.length === 0) {
		return (
			<div className='flex justify-center items-center h-[72vh] w-full'>
				<h2 className='font-erode text-4xl text-black'>No hay piezas para mostrar</h2>
			</div>
		);
	}

	const currentSubFilterIndex = procedencias.findIndex(
		(procedencia) => procedencia.origen.toLowerCase() === currentSubFilter.toLowerCase()
	);

	const prevFilter =
		currentSubFilterIndex > 0
			? procedencias[currentSubFilterIndex - 1]?.origen
			: procedencias[procedencias.length - 1]?.origen;

	const nextFilter =
		currentSubFilterIndex < procedencias.length - 1
			? procedencias[currentSubFilterIndex + 1]?.origen
			: procedencias[0]?.origen;

	const prevLink =
		prevFilter !== undefined && prevFilter !== null ? `/catalogo/piezas/procedencia/${prevFilter.toLowerCase()}` : '#';
	const nextLink =
		nextFilter !== undefined && nextFilter !== null ? `/catalogo/piezas/procedencia/${nextFilter.toLowerCase()}` : '#';

	return (
		<div className='flex flex-col w-full mt-10 space-y-10 items-center h-full'>
			<div className='flex items-center w-full px-10 md:px-40'>
				<Link href='/categorias'>
					<FaArrowLeft
						size={26}
						className='text-orange-500 mr-2 transform transition-transform duration-300 hover:scale-110'
					/>
				</Link>
				<h2 className='font-erode text-black text-2xl md:text-4xl mx-2'>
					Por cronología <span className='font-semibold'>{currentSubFilter.toUpperCase()}</span>
				</h2>
			</div>

			<div className='flex flex-col w-9/12 md:w-[48vw] min-h-[45vh] space-y-4'>
				{currentProcedencia?.map((proc: any, index: any) => (
					<div
						key={proc?.id_procedencia}
						className={`bg-vector${proc?.nivel_cronologico} flex flex-col transform transition-transform duration-300 hover:scale-110`}
					>
						<div className='flex flex-col justify-center items-center mt-2'>
							<p className='text-black text-lg font-bold font-erode'>
								{proc?.periodo_inicio} - {proc?.periodo_fin}
							</p>
						</div>
						<div className='flex flex-col justify-center items-center'>
							<div className='flex mx-auto my-6 overflow-x-auto w-full items-center justify-center'>
								{piezas !== undefined && piezas.length > 0 ? (
									piezas.map((pieza: any, indexPieza: any) => (
										<div key={pieza.id_pieza} className='flex flex-col justify-center items-center'>
											{pieza?.pieza_procedencias[0]?.procedencia?.id_procedencia === proc?.id_procedencia ? (
												<Link href={getLink(indexPieza)}>
													<img
														src={pieza?.modelos[1]?.modelo_imagen?.path_archivo}
														alt={pieza.nombre_pieza}
														className='h-12 sm:h-24 lg:h-28 w-auto object-contain'
													/>
													<p className='text-white text-center text-lg font-erode'>
														{pieza.nombre_pieza.replace(/-/g, ' ').substr(0, 12)}
													</p>
												</Link>
											) : null}
										</div>
									))
								) : (
									<div className='flex flex-col justify-center items-center'>
										<h2 className='font-erode text-4xl text-black'>No hay piezas</h2>
									</div>
								)}
							</div>
						</div>
						<Link href={'#'}>
							<div className='flex flex-col grid grid-cols-7 h-16 mb-2'>
								<div
									className={`flex justify-center items-center text-6xl text-white font-bold font-erode col-start-${
										index + 1
									}`}
								>
									{proc?.nivel_cronologico}
								</div>
							</div>
						</Link>
					</div>
				))}
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

export default CronologiaFase;
