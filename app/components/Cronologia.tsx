import React from 'react';
import Link from 'next/link';

interface CronologiaProps {
	data: any[];
}

function Cronologia({ data }: CronologiaProps) {
	const getLink = (index: any) => {
		const origen = data[index]?.origen ?? '#';
		return '/catalogo/piezas/procedencia/' + origen.toLowerCase();
	};

	const selectedOrigen = data[0];
	const lastOrigen = data[data.length - 1];

	console.log(data);

	return (
		<div className='flex flex-col w-full p-6 items-center'>
			<div className='p-6 justify-center items-center'>
				<h1 className='text-naranja text-center font-bold font-erode uppercase lg:text-2xl md:text-xl sm:text-lg'>
					Por cronología
				</h1>
				<p className='text-black text-justify font-robotSlap w-[90vw] md:w-[70vw] lg:w-[50vw] font-light mt-2'>
					Su viaje por esta categoría le va a permitir encontrar el tipo de pieza en un período específico del tiempo.
					En este caso inicia desde la fase de <b>{selectedOrigen?.origen.replace(/-/g, ' ')}</b>{' '}
					{selectedOrigen?.nivel_cronologico}({selectedOrigen?.periodo_inicio} - {selectedOrigen?.periodo_fin}) hasta{' '}
					{lastOrigen?.origen.replace(/-/g, ' ')} {lastOrigen?.nivel_cronologico}({lastOrigen?.periodo_inicio} -{' '}
					{lastOrigen?.periodo_fin}).
				</p>
			</div>

			{/* NO BORRAR ADVERTIDO ESTAS */}
			<div className={'bg-vector1 flex'}>
				<div className={`flex col-start-1`}></div>
			</div>
			<div className={'bg-vector2 flex'}>
				<div className={`flex col-start-2`}></div>
			</div>
			<div className={'bg-vector3 flex'}>
				<div className={`flex col-start-3`}></div>
			</div>
			<div className={'bg-vector4 flex'}>
				<div className={`flex col-start-4`}></div>
			</div>
			<div className={'bg-vector5 flex'}>
				<div className={`flex col-start-5`}></div>
			</div>
			<div className={'bg-vector6 flex'}>
				<div className={`flex col-start-6`}></div>
			</div>
			<div className={'bg-vector7 flex'}>
				<div className={`flex col-start-7`}></div>
			</div>

			<div className='flex flex-col w-9/12 md:w-[48vw] space-y-4 '>
				{data.map((origen, index) => (
					<Link key={index} href={getLink(index)}>
						<div
							className={`bg-vector${origen?.nivel_cronologico} grid grid-cols-7 h-16 transform transition-transform duration-300 hover:scale-110`}
						>
							<div
								className={`flex justify-center items-center text-6xl text-black font-bold font-erode col-start-${
									index + 1
								}`}
							>
								{/* NO BORRAR ADVERTIDO ESTAS */}
								<p className='hidden'>{index}</p>
								{origen?.nivel_cronologico}
							</div>
						</div>
					</Link>
				))}
			</div>

			<p className='text-white bg-black text-justify font-erode w-[90vw] md:w-[50vw] font-light font-tight mt-5 p-4'>
				El sitio {selectedOrigen?.origen.replace(/-/g, ' ')} de Real alto se divide en {data?.length} fases
				crono-culturales que se encuentran representadas por niveles estratigráficos donde el nivel{' '}
				{lastOrigen?.nivel_cronologico} es el más tardio y el más temprano es el nivel{' '}
				{selectedOrigen?.nivel_cronologico}.
			</p>
		</div>
	);
}

export default Cronologia;
