import React from 'react';

const Footer = () => {
	return (
		<footer className='bg-black w-full'>
			<div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 font-robotSlap'>
				<div className='md:flex md:justify-around'>
					<div className='flex mb-6 md:mb-0 text-white'>
						<a href='/' className='flex flex-col justify-center md:px-8 items-center'>
							<span className='text-3xl md:text-6xl whitespace-nowrap'>MUSEO </span>
							<span className='text-2xl md:text-5xl whitespace-nowrap'>REAL ALTO</span>
						</a>
					</div>
					<div className='grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2  md:w-2/3'>
						<div>
							<ul className='flex flex-col justify-around text-white text-2xl md:text-lg font-medium break-words h-full'>
								<li>
									<a href='/historia' className='hover:underline'>
										EL MUSEO
									</a>
								</li>
								<li>
									<a href='/categorias' className='hover:underline'>
										CATÁLOGO
									</a>
								</li>
								<li>
									<a href='/aplicacion' className='hover:underline'>
										APLICACIÓN MÓVIL
									</a>
								</li>
								<li>
									<a href='/dashboard' className='hover:underline'>
										DASHBOARD
									</a>
								</li>
							</ul>
						</div>
						<div className='text-white'>
							<h2 className='mb-4 text-2xl md:text-lg'>CONTACTO</h2>
							<ul className='font-medium break-words'>
								<li className='mb-4'>administracion@complejoculturalrealalto.org</li>
								<li className='mb-4'>info@complejoculturalrealalto.org</li>
								<li>
									Ubicado en la Comuna Pechiche, Parroquia Chanduy, Provincia de Santa Elena. Se llega por el desvio del
									kilómetro 109 de la vía Guayaquil-Salinas, aproximadamente a 12 Km.
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
				<div className='flex justify-center '>
					<div className='flex mt-4 sm:mt-0'>
						<a href='#' className='text-gray-500 hover:text-gray-900'>
							<svg
								className='w-4 h-4'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 8 19'
							>
								<path
									fillRule='evenodd'
									d='M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='sr-only'>Facebook page</span>
						</a>
						<a href='#' className='text-gray-500 hover:text-gray-900 ms-5'>
							<svg
								className='w-4 h-4'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M23.498 6.186c-.786.349-1.63.584-2.515.692a4.29 4.29 0 0 0 1.888-2.357 8.543 8.543 0 0 1-2.724 1.04A4.268 4.268 0 0 0 16.31 4c-2.36 0-4.278 1.926-4.278 4.305 0 .338.038.668.112.984-3.555-.181-6.708-1.884-8.817-4.475a4.368 4.368 0 0 0-.578 2.166 4.278 4.278 0 0 0 1.899 3.573 4.197 4.197 0 0 1-1.938-.538v.054c0 2.015 1.427 3.695 3.324 4.075a4.234 4.234 0 0 1-1.933.074c.544 1.714 2.12 2.964 3.991 2.996a8.567 8.567 0 0 1-6.337 1.776 12.07 12.07 0 0 0 6.538 1.92c7.847 0 12.138-6.555 12.138-12.24 0-.188-.004-.376-.012-.563a8.77 8.77 0 0 0 2.15-2.243Z' />
							</svg>
							<span className='sr-only'>YouTube page</span>
						</a>
						<a href='#' className='text-gray-500 hover:text-gray-900 ms-5'>
							<svg
								className='w-4 h-4'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.226 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163m0-2.163C8.741 0 8.332.012 7.052.07 5.772.128 4.519.405 3.515 1.409 2.511 2.413 2.234 3.666 2.176 4.948c-.058 1.28-.07 1.689-.07 5.052s.012 3.772.07 5.052c.058 1.28.335 2.533 1.339 3.537 1.004 1.004 2.257 1.281 3.537 1.339 1.28.058 1.689.07 5.052.07s3.772-.012 5.052-.07c1.28-.058 2.533-.335 3.537-1.339 1.004-1.004 1.281-2.257 1.339-3.537.058-1.28.07-1.689.07-5.052s-.012-3.772-.07-5.052c-.058-1.28-.335-2.533-1.339-3.537C19.481.405 18.228.128 16.948.07 15.668.012 15.259 0 12 0z' />
								<path d='M12 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 1 0 12 5.838zm0 10.162A4 4 0 1 1 12 6a4 4 0 0 1 0 8zm6.406-10.845a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0z' />
							</svg>
							<span className='sr-only'>Instagram page</span>
						</a>
						<a href='#' className='text-gray-500 hover:text-gray-900 ms-5'>
							<svg
								className='w-4 h-4'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 32 32'
							>
								<path d='M16 0C7.16 0 0 7.16 0 16c0 2.8.72 5.52 2.08 7.92L0 32l8.24-2.08C10.48 31.28 13.2 32 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm7.16 23.36c-.28.8-1.56 1.48-2.16 1.56-.56.08-1.2.12-1.72.08-.4-.04-.88-.08-1.32-.24-.44-.16-.92-.2-1.36-.36-2.44-1-4.32-2.56-5.92-4.6-.28-.36-.48-.72-.72-1.08-.28-.4-.6-.84-.8-1.28-.28-.6-.08-1.08.36-1.52.28-.28.56-.6.84-.92.12-.16.28-.32.48-.36.2-.08.4-.08.6 0 .2.08.4.16.6.28.28.16.56.32.84.52.36.24.8.48 1.08.84.28.32.52.72.8 1.04.32.4.68.76 1.08 1.08.28.28.68.56.96.8.36.28.68.52 1.12.68.36.12.76.28 1.12.28.48.04.84-.16 1.16-.56.36-.44.76-.8 1.08-1.28.16-.28.36-.48.64-.48.28 0 .52.04.8.08.2.08.4.16.6.28.36.28.76.48.8.96.04.44-.16.92-.36 1.32z' />
							</svg>
							<span className='sr-only'>WhatsApp</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
