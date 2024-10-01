'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import piezasApi from '@/app/libs/piezasApi'; // Assuming you have an API abstraction for your backend calls
import tiposApi from '@/app/libs/tiposApi';
import usosApi from '@/app/libs/usosApi';
import procedenciasApi from '@/app/libs/procedenciasApi';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function CreatePieza() {
	const router = useRouter();
	const [pieza, setPieza] = useState({
		nombre_pieza: '',
		descripcion: '',
		descripcion_corta: '',
		activo: true,
	});

	const [dimension, setDimension] = useState({
		valor_medida: '',
		unidad_medida: '',
		descripcion: '',
	});

	const [piezaTiposData, setPiezaTiposData] = useState([]);
	const [piezaProcedenciasData, setPiezaProcedenciasData] = useState([]);
	const [piezaDimensionData, setPiezaDimensionData] = useState<any[]>([]);
	const [piezaUsoData, setPiezaUsoData] = useState([]);
	const [modeloData, setModeloData] = useState([]);
	const [image3D, setImage3D] = useState({
		nombre_modelo: '',
		tipo_archivo: '',
		path_archivo: '',
		descripcion: '',
	});
	const [imageThumbnail, setImageThumbnail] = useState({
		nombre_modelo: '',
		tipo_archivo: '',
		path_archivo: '',
		descripcion: '',
	});

	const [tipos, setTipos] = useState([]);
	const [usos, setUsos] = useState([]);
	const [procedencias, setProcedencias] = useState([]);

	const fetchOrigenes = async () => {
		try {
			const response = await procedenciasApi.getAllProcedencias({});
			setProcedencias(response);
		} catch (error: any) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Carga de procedencias fallida',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			console.error(error);
		}
	};

	const fetchTipos = async () => {
		try {
			const response = await tiposApi.getAllTipos({});
			setTipos(response);
		} catch (error: any) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Carga de tipos fallida',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			console.error(error);
		}
	};

	const fetchUsos = async () => {
		try {
			const response = await usosApi.getAllUsos({});
			setUsos(response);
		} catch (error: any) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Carga de usos fallida',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			console.error(error);
		}
	};

	//Fetch data for select options (tipos, usos, procedencias)
	useEffect(() => {
		async function fetchData() {
			await fetchOrigenes();
			await fetchTipos();
			await fetchUsos();
		}
		fetchData();
	}, []);

	const handleInputChange = (e: any) => {
		const { name, value, type, checked } = e.target;
		setPieza({
			...pieza,
			[name]: type === 'checkbox' ? checked : value.toUpperCase(),
		});
	};

	const handle3DFileChange = async (e: any) => {
		if (e.target.files) {
			const formData = new FormData();
			Object.values(e.target.files).forEach((file) => {
				formData.append('file', file);
			});

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const result = await response.json();
			if (result.success) {
				await Swal.fire({
					icon: 'success',
					title: 'Exito',
					text: 'Subida de imagen exitosa',
					showConfirmButton: true,
					confirmButtonColor: '#3085d6',
				});
				setImage3D({
					nombre_modelo: result.name,
					tipo_archivo: result.type,
					path_archivo: result.path,
					descripcion: result.descripcion,
				});
			} else {
				await Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Carga de imagen fallida',
					showConfirmButton: true,
					confirmButtonColor: 'red',
				});
				setImage3D({
					nombre_modelo: '',
					tipo_archivo: '',
					path_archivo: '',
					descripcion: '',
				});
			}
		}
	};

	const handleThumbnailFileChange = async (e: any) => {
		if (e.target.files) {
			const formData = new FormData();
			Object.values(e.target.files).forEach((file) => {
				formData.append('file', file);
			});

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const result = await response.json();
			if (result.success) {
				await Swal.fire({
					icon: 'success',
					title: 'Exito',
					text: 'Subida de imagen exitosa',
					showConfirmButton: true,
					confirmButtonColor: '#3085d6',
				});
				setImageThumbnail({
					nombre_modelo: result.name,
					tipo_archivo: result.type,
					path_archivo: result.path,
					descripcion: result.descripcion,
				});
			} else {
				await Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Carga de imagen fallida',
					showConfirmButton: true,
					confirmButtonColor: 'red',
				});
				setImageThumbnail({
					nombre_modelo: '',
					tipo_archivo: '',
					path_archivo: '',
					descripcion: '',
				});
			}
		}
	};

	const handleSelectChange = (setter: any, e: any) => {
		const { options } = e.target;
		const selectedValues = Array.from(options)
			.filter((option: any) => option.selected)
			.map((option: any) => ({ id: option.value }));
		setter(selectedValues);
	};

	const handleDimensionChange = (e: any) => {
		const { name, value } = e.target;
		setDimension({
			...dimension,
			[name]: typeof value === 'string' ? value.toUpperCase() : value,
		});
	};

	const addDimension = () => {
		const dimensiones = [...piezaDimensionData];
		dimensiones.push(dimension);
		setPiezaDimensionData(dimensiones);
		setDimension({
			valor_medida: '',
			unidad_medida: '',
			descripcion: '',
		});
	};

	const removeDimension = (index: any) => {
		const updatedDimensions = [...piezaDimensionData];
		updatedDimensions.splice(index, 1);
		setPiezaDimensionData(updatedDimensions);
	};

	const sendPieza = async () => {
		if (!pieza.nombre_pieza || !pieza.descripcion || !pieza.descripcion_corta) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Existen campos vacios o invalidos.',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			return;
		}

		if (piezaDimensionData.length === 0) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe agregar al menos una dimension.',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});

			return;
		}
		if (piezaTiposData.length === 0) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar al menos un tipo.',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});

			return;
		}
		if (piezaProcedenciasData.length === 0) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar al menos una procedencia.',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});

			return;
		}
		if (piezaUsoData.length === 0) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar al menos un uso.',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			return;
		}
		if (
			image3D.descripcion !== '' &&
			image3D.nombre_modelo === '' &&
			image3D.path_archivo === '' &&
			image3D.tipo_archivo === ''
		) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe agregar una imagen visual.',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			return;
		}
		if (
			imageThumbnail.descripcion !== '' &&
			imageThumbnail.nombre_modelo === '' &&
			imageThumbnail.path_archivo === '' &&
			imageThumbnail.tipo_archivo === ''
		) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe agregar una imagen thumbnail.',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			return;
		}

		try {
			const data = {
				piezaData: {
					nombre_pieza: pieza.nombre_pieza.toUpperCase(),
					descripcion: pieza.descripcion.toUpperCase(),
					descripcion_corta: pieza.descripcion_corta.toUpperCase(),
					activo: pieza.activo ? '1' : '0',
				},
				piezaTiposData: piezaTiposData.map((tipo: any) => ({ id_tipo: tipo.id })),
				piezaProcedenciasData: piezaProcedenciasData.map((procedencia: any) => ({ id_procedencia: procedencia.id })),
				piezaDimensionData: piezaDimensionData,
				piezaUsoData: piezaUsoData.map((uso: any) => ({ id_uso: uso.id })),
				modeloData: [
					{
						nombre_modelo: pieza.nombre_pieza.toUpperCase() + '3D',
						path_archivo: image3D.path_archivo,
						tipo_archivo: image3D.tipo_archivo,
						descripcion: '3D',
					},
					{
						nombre_modelo: pieza.nombre_pieza.toUpperCase() + 'THUMBNAIL',
						path_archivo: imageThumbnail.path_archivo,
						tipo_archivo: imageThumbnail.tipo_archivo,
						descripcion: 'THUMBNAIL',
					},
				],
			};
			const response = await piezasApi.createPieza(data);

			if (response) {
				await Swal.fire({
					icon: 'success',
					title: 'Exito',
					text: 'Ha sido creada la pieza correctamente.',
					showConfirmButton: true,
					confirmButtonColor: '#3085d6',
				});
				router.push('/dashboard/piezas');
			}
		} catch (error) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al agregar pieza',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			console.error(error);
		}
	};

	const limpiar = () => {
		setPieza({
			nombre_pieza: '',
			descripcion: '',
			descripcion_corta: '',
			activo: true,
		});
		setImage3D({
			nombre_modelo: '',
			tipo_archivo: '',
			path_archivo: '',
			descripcion: '',
		});
		setImageThumbnail({
			nombre_modelo: '',
			tipo_archivo: '',
			path_archivo: '',
			descripcion: '',
		});
		setPiezaTiposData([]);
		setPiezaProcedenciasData([]);
		setPiezaDimensionData([{ valor_medida: '', unidad_medida: '', descripcion: '' }]);
		setPiezaUsoData([]);
	};

	return (
		<main className='flex flex-col bg-white text-black w-full p-10'>
			<div className='mx-6'>
				<h1 className='my-6 text-xl md:text-4xl flex items-center justify-center font-semibold'>Crear Pieza</h1>
				{/* Pieza Main Info */}
				<div className='grid grid-cols-12 gap-2 w-full shadow-md p-4 border'>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Nombre de Pieza:</label>
						<input
							type='text'
							name='nombre_pieza'
							value={pieza.nombre_pieza}
							className='w-full border border-gray-300 rounded px-3 py-2'
							placeholder='Ingrese nombre de la pieza'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Descripcion:</label>
						<textarea
							name='descripcion'
							value={pieza.descripcion}
							className='w-full border border-gray-300 rounded px-3 py-2'
							placeholder='Ingrese descripcion'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Descripcion Corta:</label>
						<input
							type='text'
							name='descripcion_corta'
							value={pieza.descripcion_corta}
							className='w-full border border-gray-300 rounded px-3 py-2'
							placeholder='Ingrese descripcion corta'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Activo:</label>
						<input type='checkbox' name='activo' checked={pieza.activo} onChange={handleInputChange} />
					</div>
				</div>

				<hr className='my-6' />

				{/* Pieza Dimension */}
				<div className='grid grid-cols-12 gap-2 w-full shadow-md p-4 border'>
					<div className='col-span-12 w-full'>
						<h3 className='text-lg'>Dimensiones de pieza:</h3>
						<div className='grid grid-cols-12 gap-2 w-full mt-4 items-center'>
							<div className='col-span-12 md:col-span-6 w-full'>
								<label>Descripcion:</label>
								<input
									type='text'
									name='descripcion'
									value={dimension.descripcion}
									className='w-full border border-gray-300 rounded px-3 py-2'
									placeholder='Ingrese la descripcion de la medida'
									onChange={handleDimensionChange}
								/>
							</div>
							<div className='col-span-12 md:col-span-6 w-full'>
								<label>Valor:</label>
								<input
									type='number'
									name='valor_medida'
									step={0.1}
									min={0.0}
									value={dimension.valor_medida}
									className='w-full border border-gray-300 rounded px-3 py-2'
									placeholder='Ingrese valor de medida'
									onChange={handleDimensionChange}
								/>
							</div>
							<div className='col-span-12 md:col-span-6 w-full'>
								<label>Unidad:</label>
								<input
									type='text'
									name='unidad_medida'
									value={dimension.unidad_medida}
									className='w-full border border-gray-300 rounded px-3 py-2'
									placeholder='Ingrese unidad de medida'
									onChange={handleDimensionChange}
								/>
							</div>
							<div className='col-span-12 md:col-span-6 w-full mt-4'>
								<button
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
									onClick={addDimension}
								>
									Agregar Dimension
								</button>
							</div>
						</div>

						<div
							className={
								`${piezaDimensionData.length === 0 ? 'border border-red-500 ' : 'border border-gray-400 '}` +
								'grid grid-cols-12 gap-2 w-full mt-4 p-4 items-center rounded-md'
							}
						>
							{piezaDimensionData.length === 0 && (
								<div className='col-span-12 md:col-span-4 w-full h-12 items-center flex'>
									<p>No hay dimensiones agregadas.</p>
								</div>
							)}
							{piezaDimensionData.map((dimension, index) => (
								<div key={index} className='col-span-12 w-full mx-4 my-2'>
									<div className='flex flex-row w-fit gap-4'>
										<p>
											{dimension.descripcion}: {dimension.valor_medida} {dimension.unidad_medida}
										</p>
										<FaTrash
											size={20}
											className='hover:cursor-pointer text-gray-500 hover:text-red-600'
											onClick={() => removeDimension(index)}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<hr className='my-6' />

				<div className='grid grid-cols-12 gap-2 w-full shadow-md p-4 border'>
					<div className='col-span-12 md:col-span-4'>
						{/* Pieza Procedencia */}
						<h3 className='text-lg'>Procedencia de pieza:</h3>
						<select
							multiple
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
							onChange={(e) => handleSelectChange(setPiezaProcedenciasData, e)}
						>
							{procedencias.map((procedencia: any) => (
								<option key={procedencia.id_procedencia} value={procedencia.id_procedencia}>
									{procedencia.origen.replace(/-/g, ' ')} - {procedencia.nivel_cronologico} (
									{procedencia.periodo_inicio} - {procedencia.periodo_fin})
								</option>
							))}
						</select>
					</div>
					<div className='col-span-12 md:col-span-4'>
						{/* Pieza Tipo */}
						<h3 className='text-lg'>Tipos de pieza:</h3>
						<select
							multiple
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
							onChange={(e) => handleSelectChange(setPiezaTiposData, e)}
						>
							{tipos.map((tipo: any) => (
								<option key={tipo.id_tipo} value={tipo.id_tipo}>
									{tipo.nombre_tipo.replace(/-/g, ' ')}
								</option>
							))}
						</select>
					</div>
					<div className='col-span-12 md:col-span-4'>
						{/* Pieza Uso */}
						<h3 className='text-lg'>Usos de pieza:</h3>
						<select
							multiple
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
							onChange={(e) => handleSelectChange(setPiezaUsoData, e)}
						>
							{usos.map((uso: any) => (
								<option key={uso.id_uso} value={uso.id_uso}>
									{uso.nombre_uso.replace(/-/g, ' ')}
								</option>
							))}
						</select>
					</div>
				</div>

				<hr className='my-6' />

				<div className='grid grid-cols-12 gap-2 w-full shadow-md p-4 border'>
					<div className='col-span-12'>
						<h3 className='text-lg'>Imagenes de pieza:</h3>
						<h3 className='mt-6'>Imagen Visual</h3>
						<input type='file' onChange={handle3DFileChange} className='w-full mt-2' />

						<h3 className='mt-6'>Imagen Thumbnail</h3>
						<input type='file' onChange={handleThumbnailFileChange} className='w-full mt-2' />
					</div>
				</div>

				<div className='flex flex-row gap-2 items-center justify-center w-full mt-4'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
						onClick={sendPieza}
					>
						Agregar
					</button>
					<button
						className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full'
						onClick={limpiar}
					>
						Limpiar
					</button>
				</div>
			</div>
		</main>
	);
}
