'use client';
import Link from 'next/link';
import Image from 'next/image';

interface TipoPiezaProps {
	data: any[];
}

function TipoPieza({ data }: TipoPiezaProps) {
	const getLink = (index: any) => {
		const link = data[index]?.nombre_tipo ?? '#';
		return '/catalogo/piezas/tipo/' + link;
	};

	return (
		<div className='flex flex-col w-[100vw] items-center'>
			<div className='flex flex-col p-6 gap-4'>
				<h2 className='font-erode font-bold text-naranja uppercase lg:text-2xl md:text-xl sm:text-lg text-center'>
					Por tipo de piezas
				</h2>
				<p className='text-black text-justify md:w-[35vw] font-robotSlap text-base font-light'>
					En esta categoría están diversos objetos de cerámica pertenecientes a la Cultura Valdivia entre los que se
					encuentran: cuencos, ollas y figurinas. Cada uno con una gran diversidad estética.
				</p>
			</div>
			<div className='flex h-[20vh] sm:h-[32vh] md:bg-vector1 w-full md:w-[70vw] justify-center md:ml-auto mt-2'>
				<div className='flex w-full justify-around md:justify-normal gap-2 md:gap-4 items-center md:ml-20 overflow-x-auto'>
					{data?.map((tipoPieza, index) => (
						<Link key={index} href={getLink(index)}>
							<div className='cursor-pointer bg-black rounded-lg w-[25vw] md:w-[12vw] md:h-[20vh] space-y-4 flex flex-col justify-between overflow-hidden transition duration-100 hover:scale-105'>
								<h3 className='font-erode text-white text-sm lg:text-lg font-semibold text-center uppercase'>
									{tipoPieza?.nombre_tipo.replace(/-/g, ' ')}
								</h3>
								<Image
									src={`/catalogo/${tipoPieza?.nombre_tipo.toLowerCase()}.png`}
									alt={tipoPieza?.nombre_tipo}
									width={350}
									height={350}
									priority
									className='object-cover'
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default TipoPieza;
