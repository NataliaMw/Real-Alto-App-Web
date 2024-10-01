import React from 'react';
import homeImg from '../images/homeImg2.jpg';

function Principal() {
	const imgSrc: string = homeImg.src;

	return (
		<div className='relative w-[100vw] h-[90vh]'>
			{/* Aplicar opacidad directamente a la imagen */}
			<img src={imgSrc} alt='imagen' className='w-[100vw] h-[90vh] object-cover' />
			<div className='absolute top-0 left-0 right-0 bottom-0 bg-naranja bg-opacity-50 mix-blend-multiply'></div>
			<div className='absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white gap-8'>
				<h1 className='sm:text-3xl md:text-4xl lg:text-5xl font-erode font-semibold text-center w-[80vw] tracking-wide'>
					CATÁLOGO ARQUEOLÓGICO INTERACTIVO DEL COMPLEJO CULTURAL REAL ALTO
				</h1>
				<a href='/catalogo/piezas'>
					<button className='bg-white text-black py-3 px-4 text-center rounded-full sm:text-base lg:text-lg font-erode'>
						DESCUBRIR
					</button>
				</a>{' '}
			</div>
		</div>
	);
}

export default Principal;
