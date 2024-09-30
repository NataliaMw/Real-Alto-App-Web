import type { Metadata } from 'next';
import '@/app/globals.css';
import Link from 'next/link';
import { FaPuzzlePiece, FaColumns, FaMapMarkedAlt, FaHome, FaBars, FaShapes } from 'react-icons/fa';

export const metadata: Metadata = {
	title: 'Dashboard Real Alto',
	description: 'Dashboard de recursos de Real Alto',
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<link href='https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css' rel='stylesheet' />
			</head>
			<body>
				<>
					<button
						data-drawer-target='default-sidebar'
						data-drawer-toggle='default-sidebar'
						aria-controls='default-sidebar'
						type='button'
						className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
					>
						<span className='sr-only'>Open sidebar</span>
						<FaBars size={24} />
					</button>

					<aside
						id='default-sidebar'
						className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
						aria-label='Sidebar'
					>
						<div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between'>
							<ul className='space-y-2 font-medium'>
								<li>
									<Link
										href='/dashboard'
										className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
									>
										<div className='flex flex-col w-full items-center justify-center mx-auto text-black'>
											<span className='ms-3 text-2xl whitespace-nowrap'>MUSEO</span>
											<span className='ms-3 text-lg whitespace-nowrap'>REAL ALTO</span>
										</div>
									</Link>
								</li>
								<li>
									<hr />
								</li>
								<li>
									<Link
										href='/dashboard/piezas'
										className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
									>
										<FaPuzzlePiece
											size={20}
											className='flex-shrink-0  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										/>
										<span className='flex-1 ms-3 whitespace-nowrap'>Gestión de Piezas</span>
									</Link>
								</li>
								<li>
									<Link
										href='/dashboard/procedencias'
										className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
									>
										<FaMapMarkedAlt
											size={20}
											className='flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										/>
										<span className='flex-1 ms-3 whitespace-nowrap'>Gestión de Procedencias</span>
									</Link>
								</li>
								<li>
									<Link
										href='/dashboard/usos'
										className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
									>
										<FaColumns
											size={20}
											className='flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										/>
										<span className='flex-1 ms-3 whitespace-nowrap'>Gestión de Usos</span>
									</Link>
								</li>
								<li>
									<Link
										href='/dashboard/tipos'
										className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
									>
										<FaShapes
											size={20}
											className='flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										/>
										<span className='flex-1 ms-3 whitespace-nowrap'>Gestión de Tipos</span>
									</Link>
								</li>
							</ul>
							<ul className='space-y-2 font-medium'>
								<li>
									<Link
										href='/home'
										className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
									>
										<FaHome
											size={20}
											className='flex-shrink-0  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										/>
										<span className='flex-1 ms-3 whitespace-nowrap'>Regresar a Inicio</span>
									</Link>
								</li>
							</ul>
						</div>
					</aside>

					<div className='p-4 sm:ml-64'>{children}</div>
				</>
				<script src='https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js'></script>
			</body>
		</html>
	);
}
