'use client';
import { useEffect, useState } from 'react';
import tiposApi from '@/app/libs/tiposApi';

import { FiSlash, FiXCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function DashboardTipos() {
	const router = useRouter();
	const [tipos, setTipos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Pagination and filters state
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(1);

	const [searchAfterReset, setSearchAfterReset] = useState(false);
	const [searchAfterPageChange, setSearchAfterPageChange] = useState(false);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		setSearchAfterPageChange(true);
	};

	useEffect(() => {
		if (searchAfterPageChange) {
			fetchTipos();
			setSearchAfterPageChange(false);
		}
	}, [searchAfterPageChange]);

	const [filters, setFilters] = useState({
		id_tipo: '',
		busqueda: '',
	});

	const fetchTipos = async () => {
		setLoading(true);
		try {
			const params = {
				...filters,
				page,
				pageSize,
				paginated: 1,
			};
			const response = await tiposApi.getAllTipos(params);
			setTipos(response.data);
			setTotalPages(response.totalPages ?? 1);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTipos();
	}, []);

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	const searchTipo = () => {
		setPage(1);
		fetchTipos();
	};

	const resetSearch = async () => {
		setFilters({
			id_tipo: '',
			busqueda: '',
		});
		setPage(1);
		setSearchAfterReset(true);
	};

	useEffect(() => {
		if (searchAfterReset) {
			searchTipo();
			setSearchAfterReset(false); // Reset search trigger after searching
		}
	}, [searchAfterReset]);

	const editTipo = async (tipo: any) => {
		router.push(`/dashboard/tipos/tipo/${tipo.id_tipo}`);
	};

	const deleteTipo = async (tipo: any) => {
		try {
			const id = tipo.id_tipo;
			const response = await tiposApi.deleteTipo(id);
			searchTipo();
		} catch (error: any) {
			console.error(error?.error);
		}
	};

	const emptyTipos = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiSlash size={42} />
			<h1 className='text-2xl font-semibold'>No se encontraron tipos</h1>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetSearch}>
				Borrar filtros
			</button>
		</div>
	);

	const errorTipos = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiXCircle size={42} />
			<h3 className='text-2xl font-semibold'>Error al cargar tipos</h3>
			<p>{error}</p>
		</div>
	);

	return (
		<main className='flex flex-col bg-white text-black w-full h-full min-h-[100vh]'>
			<div className='mx-6'>
				<h1 className='mt-6 mb-2 text-2xl md:text-4xl flex justify-start font-semibold'>Gestión de Tipos</h1>
				<p className='text-gray-700 text-lg'>
					Visualice los tipos de piezas arqueologicas que se encuentran registradas y realice las actualizaciones que
					crea necesarias.
				</p>
				{/* <!-- Filtros --> */}
				<div className='grid grid-cols-12 gap-2 mt-6'>
					<section className='grid grid-cols-12 col-span-12 gap-4 mb-6 items-center'>
						<div className='col-span-12 md:col-span-6'>
							<label className='block text-gray-700'>ID Tipo:</label>
							<input
								type='text'
								name='id_tipo'
								value={filters.id_tipo}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
								onKeyDown={(e) => e.key === 'Enter' && searchTipo()}
								placeholder='Buscar por ID de tipo'
							/>
						</div>
						<div className='col-span-12 md:col-span-6'>
							<label className='block text-gray-700'>Búsqueda:</label>
							<input
								type='text'
								name='busqueda'
								value={filters.busqueda}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
								onKeyDown={(e) => e.key === 'Enter' && searchTipo()}
								placeholder='Buscar por nombre de tipo o descripcion'
							/>
						</div>
					</section>
				</div>
				<div className='w-fit items-center justify-center flex ml-auto'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
						onClick={searchTipo}
					>
						Filtrar
					</button>
				</div>
				<hr className='my-2' />
				<div className='flex justify-end'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={() => router.push('/dashboard/tipos/tipo')}
					>
						Agregar Tipo
					</button>
				</div>
				{/* <!-- Catálogo --> */}
				{loading ? (
					emptyTipos
				) : error ? (
					errorTipos
				) : !loading && !error && tipos.length !== 0 ? (
					<div className='overflow-x-auto h-full my-2 shadow-md'>
						<table className='tableDashboard min-w-full'>
							<thead>
								<tr>
									<th>ID Tipo</th>
									<th>Nombre de Tipo</th>
									<th>Descripcion</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{tipos.length !== 0 &&
									tipos.map((tipo: any, index) => (
										<tr key={index}>
											<td>{tipo.id_tipo}</td>
											<td>
												<Link href={'#'}>{tipo.nombre_tipo.replace(/-/g, ' ')}</Link>
											</td>
											<td>{tipo.descripcion}</td>
											<td>
												<div className='flex flex-row gap-2 items-center justify-center'>
													<button
														className='hover: cursor-pointer p-2 hover:bg-gray-200 rounded-md text-gray-500 hover:text-cyan-500 flex items-center justify-center'
														onClick={() => editTipo(tipo)}
													>
														<FaEdit size={24} />
													</button>
													<button
														className='hover: cursor-pointer p-2 hover:bg-gray-200 rounded-md text-gray-500 hover:text-red-500 flex items-center justify-center'
														onClick={() => deleteTipo(tipo)}
													>
														<FaTrash size={24} />
													</button>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				) : (
					emptyTipos
				)}
				<div className='flex justify-between items-center my-6'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
					>
						Anterior
					</button>
					<span>
						Página {page} de {totalPages}
					</span>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={() => handlePageChange(page + 1)}
						disabled={page >= totalPages}
					>
						Siguiente
					</button>
				</div>
			</div>
		</main>
	);
}
