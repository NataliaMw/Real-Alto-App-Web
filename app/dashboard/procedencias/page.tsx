'use client';
import { useEffect, useState } from 'react';
import procedenciasApi from '@/app/libs/procedenciasApi';

import { FiSlash, FiXCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardProcedencias() {
	const router = useRouter();
	const [procedencias, setProcedencias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Pagination and filters state
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(1);

	const [searchAfterReset, setSearchAfterReset] = useState(false);

	const [filters, setFilters] = useState({
		id_procedencia: '',
		busqueda: '',
	});

	const fetchProcedencias = async () => {
		setLoading(true);
		try {
			const params = {
				...filters,
				page,
				pageSize,
				paginated: 1,
			};
			const response = await procedenciasApi.getAllProcedencias(params);
			setProcedencias(response.data);
			setTotalPages(response.totalPages ?? 1);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProcedencias();
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
		fetchProcedencias();
	};

	const searchProcedencia = () => {
		setPage(1);
		fetchProcedencias();
	};

	const resetSearch = async () => {
		setFilters({
			id_procedencia: '',
			busqueda: '',
		});
		setPage(1);
		setSearchAfterReset(true);
	};

	useEffect(() => {
		if (searchAfterReset) {
			searchProcedencia();
			setSearchAfterReset(false); // Reset search trigger after searching
		}
	}, [searchAfterReset]);

	const emptyProcedencias = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiSlash size={42} />
			<h1 className='text-2xl font-semibold'>No se encontraron procedencias</h1>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetSearch}>
				Borrar filtros
			</button>
		</div>
	);

	const errorProcedencias = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiXCircle size={42} />
			<h3 className='text-2xl font-semibold'>Error al cargar procedencias</h3>
			<p>{error}</p>
		</div>
	);

	return (
		<main className='flex flex-col bg-white text-black w-full'>
			<div className='mx-6'>
				<h1 className='my-6 text-xl md:text-3xl flex justify-center'>Procedencias</h1>
				{/* <!-- Filtros --> */}
				<div className='grid grid-cols-12 gap-2'>
					<section className='grid grid-cols-12 col-span-9 gap-4 mb-6 items-center'>
						<div className='col-span-12 md:col-span-6 bg-slate'>
							<label className='block text-gray-700'>ID Procedencia:</label>
							<input
								type='text'
								name='id_procedencia'
								value={filters.id_procedencia}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
								onKeyDown={(e) => e.key === 'Enter' && searchProcedencia()}
								placeholder='Buscar por ID de procedencia'
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
								onKeyDown={(e) => e.key === 'Enter' && searchProcedencia()}
								placeholder='Buscar por origen, descripcion o periodo'
							/>
						</div>
					</section>
					<div className='col-span-3 items-center justify-center flex'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
							onClick={searchProcedencia}
						>
							Filtrar
						</button>
					</div>
				</div>
				<hr className='my-2' />
				<div className='flex justify-end'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={() => router.push('/dashboard/procedencias/procedencia')}
					>
						Agregar Procedencia
					</button>
				</div>
				{/* <!-- Catálogo --> */}
				{loading && emptyProcedencias}
				{error && errorProcedencias}
				{!loading && !error && procedencias.length !== 0 ? (
					<table className='my-12 tableDashboard'>
						<thead>
							<tr>
								<th>ID Procedencia</th>
								<th>Origen</th>
								<th>Nivel Cronologico</th>
								<th>Descripcion</th>
								<th>Periodo Inicio</th>
								<th>Periodo Fin</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{procedencias.length !== 0 &&
								procedencias.map((procedencia: any, index) => (
									<tr key={index}>
										<td>{procedencia.id_procedencia}</td>
										<td>
											<Link href={'#'}>{procedencia.origen}</Link>
										</td>
										<td>{procedencia.nivel_cronologico}</td>
										<td>{procedencia.descripcion}</td>
										<td>{procedencia.periodo_inicio}</td>
										<td>{procedencia.periodo_fin}</td>
										<td></td>
									</tr>
								))}
						</tbody>
					</table>
				) : (
					emptyProcedencias
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
