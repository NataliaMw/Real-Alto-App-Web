'use client';
import { useEffect, useState } from 'react';
import usosApi from '@/app/libs/usosApi';

import { FiSlash, FiXCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardUsos() {
	const router = useRouter();
	const [usos, setUsos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Pagination and filters state
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(1);

	const [searchAfterReset, setSearchAfterReset] = useState(false);

	const [filters, setFilters] = useState({
		id_uso: '',
		busqueda: '',
	});

	const fetchUsos = async () => {
		setLoading(true);
		try {
			const params = {
				...filters,
				page,
				pageSize,
				paginated: 1,
			};
			const response = await usosApi.getAllUsos(params);
			setUsos(response.data);
			setTotalPages(response.totalPages ?? 1);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsos();
	}, []);

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		fetchUsos();
	};

	const searchUso = () => {
		setPage(1);
		fetchUsos();
	};

	const resetSearch = async () => {
		setFilters({
			id_uso: '',
			busqueda: '',
		});
		setPage(1);
		setSearchAfterReset(true);
	};

	useEffect(() => {
		if (searchAfterReset) {
			searchUso();
			setSearchAfterReset(false); // Reset search trigger after searching
		}
	}, [searchAfterReset]);

	const emptyUsos = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiSlash size={42} />
			<h1 className='text-2xl font-semibold'>No se encontraron usos</h1>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetSearch}>
				Borrar filtros
			</button>
		</div>
	);

	const errorUsos = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiXCircle size={42} />
			<h3 className='text-2xl font-semibold'>Error al cargar usos</h3>
			<p>{error}</p>
		</div>
	);

	return (
		<main className='flex flex-col bg-white text-black w-full'>
			<div className='mx-6'>
				<h1 className='my-6 text-xl md:text-3xl flex justify-center'>Usos</h1>
				{/* <!-- Filtros --> */}
				<div className='grid grid-cols-12 gap-2'>
					<section className='grid grid-cols-12 col-span-9 gap-4 mb-6 items-center'>
						<div className='col-span-12 md:col-span-6'>
							<label className='block text-gray-700'>ID Uso:</label>
							<input
								type='text'
								name='id_uso'
								value={filters.id_uso}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
								onKeyDown={(e) => e.key === 'Enter' && searchUso()}
								placeholder='Buscar por ID de uso'
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
								onKeyDown={(e) => e.key === 'Enter' && searchUso()}
								placeholder='Buscar por nombre de uso o descripcion'
							/>
						</div>
					</section>
					<div className='col-span-3 items-center justify-center flex'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
							onClick={searchUso}
						>
							Filtrar
						</button>
					</div>
				</div>
				<hr className='my-2' />
				<div className='flex justify-end'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={() => router.push('/dashboard/usos/uso')}
					>
						Agregar Uso
					</button>
				</div>
				{/* <!-- Catálogo --> */}
				{loading && emptyUsos}
				{error && errorUsos}
				{!loading && !error && usos.length !== 0 ? (
					<table className='my-12 tableDashboard'>
						<thead>
							<tr>
								<th>ID Uso</th>
								<th>Nombre de Uso</th>
								<th>Descripcion</th>
							</tr>
						</thead>
						<tbody>
							{usos.length !== 0 &&
								usos.map((uso: any, index) => (
									<tr key={index}>
										<td>{uso.id_uso}</td>
										<td>
											<Link href={'#'}>{uso.nombre_uso}</Link>
										</td>
										<td>{uso.descripcion}</td>
										<td></td>
									</tr>
								))}
						</tbody>
					</table>
				) : (
					emptyUsos
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
