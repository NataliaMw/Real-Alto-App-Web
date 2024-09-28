'use client';
import React, { useState } from 'react';
import Link from 'next/link'; // Importa el componente Link de Next.js

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<nav className='bg-black w-screen'>
			<div className='flex flex-wrap items-center justify-between md:justify-around mx-auto p-4'>
				<div className='flex flex-col md:w-1/5 text-white font-robotSlap'>
					<Link href='/' className='self-center flex flex-col'>
						<span className='self-center text-3xl whitespace-nowrap'>MUSEO</span>
						<span className='self-center text-xl whitespace-nowrap'>REAL ALTO</span>
					</Link>
				</div>
				<button
					type='button'
					className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
                    rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
					onClick={toggleMenu}
				>
					<span className='sr-only'>Open main menu</span>
					<svg
						className='w-5 h-5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 17 14'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M1 1h15M1 7h15M1 13h15'
						/>
					</svg>
				</button>
				<div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-4/5`} id='navbar-default'>
					<ul
						className='font-robotSlap flex flex-col justify-around w-full p-4 mt-4 
                    rounded-lg rtl:space-x-reverse 
                    md:flex-row md:p-0 md:mt-0 '
					>
						<li>
							<a
								href='/historia'
								className='block py-2 px-3 text-white rounded md:bg-transparent md:hover:text-blue-700 md:p-0'
							>
								EL MUSEO
							</a>
						</li>
						<li>
							<a
								href='/categorias'
								className='block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white'
							>
								CATÁLOGO
							</a>
						</li>
						<li>
							<a
								href='/aplicacion'
								className='block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white'
							>
								APP MÓVIL
							</a>
						</li>
						<li>
							<a
								href='/contacto'
								className='block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white'
							>
								CONTACTOS
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
