'use client';
import { useEffect, useState } from 'react';
import piezasApi from '@/app/libs/piezasApi';
import usosApi from '@/app/libs/usosApi';
import tiposApi from '@/app/libs/tiposApi';
import procedenciasApi from '@/app/libs/procedenciasApi';

import { FiSlash, FiXCircle } from 'react-icons/fi';
import { FaTrash, FaEdit } from 'react-icons/fa';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DashboardPiezas() {
	const router = useRouter();
	const [piezas, setPiezas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tiposPieza, setTiposPieza] = useState([]);
	const [usosPieza, setUsosPieza] = useState([]);
	const [origenesPieza, setOrigenesPieza] = useState([]);

	// Pagination and filters state
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(1);

	const [searchAfterReset, setSearchAfterReset] = useState(false);

	const [filters, setFilters] = useState({
		id_procedencia: '',
		id_uso: '',
		id_tipo: '',
		busqueda: '',
	});

	const editPieza = (pieza: any) => {
		router.push(`/dashboard/piezas/pieza/${pieza.id_pieza}`);
	};

	const deletePieza = async (pieza: any) => {
		try {
			const id = pieza.id_pieza;
			const response = await piezasApi.deletePieza(id);
			searchPiezas();
		} catch (error: any) {
			console.error(error?.error);
		}
	};

	const fetchPiezas = async () => {
		setLoading(true);
		try {
			const params = {
				...filters,
				page,
				pageSize,
				paginated: 1,
				activo: 1,
				with_pieza_usos: 1,
				with_pieza_tipos: 1,
				with_pieza_procedencias: 1,
				with_pieza_dimension: 1,
				with_modelos: 1,
			};
			const response = await piezasApi.getAllPiezas(params);
			console.log(response.data);
			setPiezas(response.data);
			setTotalPages(response.totalPages ?? 1);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
		}
	};

	const fetchOrigenes = async () => {
		try {
			const response = await procedenciasApi.getAllProcedencias({});
			setOrigenesPieza(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const fetchTipos = async () => {
		try {
			const response = await tiposApi.getAllTipos({});
			setTiposPieza(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const fetchUsos = async () => {
		try {
			const response = await usosApi.getAllUsos({});
			setUsosPieza(response);
		} catch (error: any) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchOrigenes();
		fetchTipos();
		fetchUsos();
		fetchPiezas();
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
		fetchPiezas();
	};

	const searchPiezas = () => {
		setPage(1);
		fetchPiezas();
	};

	const resetSearch = async () => {
		setFilters({
			id_procedencia: '',
			id_uso: '',
			id_tipo: '',
			busqueda: '',
		});
		setPage(1);
		setSearchAfterReset(true);
	};

	useEffect(() => {
		if (searchAfterReset) {
			searchPiezas();
			setSearchAfterReset(false); // Reset search trigger after searching
		}
	}, [searchAfterReset]);

	const emptyPiezas = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiSlash size={42} />
			<h1 className='text-2xl font-semibold'>No se encontraron piezas</h1>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetSearch}>
				Borrar filtros
			</button>
		</div>
	);

	const errorPiezas = (
		<div className='bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-col gap-2'>
			<FiXCircle size={42} />
			<h3 className='text-2xl font-semibold'>Error al cargar las piezas</h3>
			<p>{error}</p>
		</div>
	);

	return (
		<main className='flex flex-col bg-white text-black w-full'>
			<div className='mx-6'>
				<h1 className='my-6 text-xl md:text-3xl flex justify-center'>Piezas</h1>
				{/* <!-- Filtros --> */}
				<div className='grid grid-cols-12 gap-2'>
					<section className='grid grid-cols-12 col-span-9 gap-4 mb-6 items-center'>
						<div className='col-span-12 md:col-span-3'>
							<label className='block text-gray-700'>Búsqueda:</label>
							<input
								type='text'
								name='busqueda'
								value={filters.busqueda}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
								onKeyDown={(e) => e.key === 'Enter' && searchPiezas()}
								placeholder='Buscar por descripcion o nombre'
							/>
						</div>
						<div className='col-span-12 md:col-span-3'>
							<label className='block text-gray-700'>Procedencia:</label>
							<select
								name='id_procedencia'
								value={filters.id_procedencia}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
							>
								<option value=''>Selecciona una procedencia</option>
								{origenesPieza?.map((origen: any) => (
									<option key={origen.id_procedencia} value={origen.id_procedencia}>
										{origen.origen ?? 'Sin origen'} - Nivel {origen.nivel_cronologico}
									</option>
								))}
							</select>
						</div>
						<div className='col-span-12 md:col-span-3'>
							<label className='block text-gray-700'>Tipo de pieza:</label>
							<select
								name='id_tipo'
								value={filters.id_tipo}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
							>
								<option value=''>Selecciona un tipo de pieza</option>
								{tiposPieza?.map((tipo: any) => (
									<option key={tipo.id_tipo} value={tipo.id_tipo}>
										{tipo.id_tipo} - {tipo.nombre_tipo ?? 'Sin tipo'}
									</option>
								))}
							</select>
						</div>
						<div className='col-span-12 md:col-span-3'>
							<label className='block text-gray-700'>Uso de pieza:</label>
							<select
								name='id_uso'
								value={filters.id_uso}
								className='w-full border border-gray-300 rounded px-3 py-2'
								onChange={handleFilterChange}
							>
								<option value=''>Selecciona un uso de la pieza</option>
								{usosPieza?.map((uso: any) => (
									<option key={uso.id_uso} value={uso.id_uso}>
										{uso.id_uso} - {uso.nombre_uso ?? 'Sin uso'}
									</option>
								))}
							</select>
						</div>
					</section>
					<div className='col-span-3 items-center justify-center flex'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
							onClick={searchPiezas}
						>
							Filtrar
						</button>
					</div>
				</div>
				<hr className='my-2' />
				<div className='flex justify-end'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={() => router.push('/dashboard/piezas/pieza')}
					>
						Agregar Pieza
					</button>
				</div>
				{/* <!-- Catálogo --> */}
				{loading ? (
					emptyPiezas
				) : error ? (
					errorPiezas
				) : !loading && !error && piezas.length !== 0 ? (
					<table className='my-12 tableDashboard'>
						<thead>
							<tr>
								<th>ID Pieza</th>
								<th>Nombre Pieza</th>
								<th>Descripcion</th>
								<th>Descripcion Corta</th>
								<th>Activo</th>
								<th>Tipos de Pieza</th>
								<th>Usos de pieza</th>
								<th>Procedencias de pieza</th>
								<th>Imagen de pieza</th>
								<th>Dimensiones de pieza</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{piezas.length !== 0 &&
								piezas.map((pieza: any, index) => (
									<tr key={index}>
										<td>{pieza.id_pieza}</td>
										<td>
											<Link href={'#'}>{pieza.nombre_pieza}</Link>
										</td>
										<td>{pieza.descripcion}</td>
										<td>{pieza.descripcion_corta}</td>
										<td>{pieza.activo === true ? 1 : 0}</td>
										<td>
											{pieza?.pieza_tipo?.map((piezatipo: any) => {
												return <p key={piezatipo.id_pieza_tipo}>{piezatipo?.tipo?.nombre_tipo}</p>;
											})}
										</td>
										<td>
											{pieza?.pieza_uso?.map((piezauso: any) => {
												return <p key={piezauso.id_pieza_uso}>{piezauso?.uso?.nombre_uso}</p>;
											})}
										</td>
										<td>
											{pieza?.pieza_procedencia?.map((pieza_proc: any) => {
												const origen = pieza_proc?.procedencia?.origen;
												const nivel = pieza_proc?.procedencia?.nivel_cronologico;
												return <p key={pieza_proc.id_pieza_procedencia}>{origen + ' - ' + nivel}</p>;
											})}
										</td>
										<td>
											<Image
												src={pieza?.modelo?.[0].modelo_imagen?.path_archivo}
												alt={pieza?.modelo?.[0].modelo_imagen?.nombre_archivo}
												width={100}
												height={100}
												className='rounded-md object-cover'
											/>
										</td>
										<td>
											{pieza?.pieza_dimension?.map((pieza_dim: any) => {
												const unidad = pieza_dim?.dimensiones?.unidad_medida;
												const valor = pieza_dim?.dimensiones?.valor_medida;
												const descripcion = pieza_dim?.dimensiones?.descripcion;
												return <p key={pieza_dim.id_pieza_dimension}>{descripcion + ': ' + valor + unidad}</p>;
											})}
										</td>
										<td>
											<div className='flex flex-row gap-2 items-center justify-center'>
												<button
													className='hover: cursor-pointer p-2 hover:bg-gray-200 rounded-md text-gray-500 hover:text-cyan-500 flex items-center justify-center'
													onClick={() => editPieza(pieza)}
												>
													<FaEdit size={24} />
												</button>
												<button
													className='hover: cursor-pointer p-2 hover:bg-gray-200 rounded-md text-gray-500 hover:text-red-500 flex items-center justify-center'
													onClick={() => deletePieza(pieza)}
												>
													<FaTrash size={24} />
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				) : (
					emptyPiezas
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
