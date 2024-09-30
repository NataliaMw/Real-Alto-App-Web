'use client';
import { useState } from 'react';
import tiposApi from '@/app/libs/tiposApi';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Tipo() {
	const router = useRouter();
	const [tipo, setTipo] = useState({
		nombre_tipo: '',
		descripcion: '',
	});

	const sendTipo = async () => {
		if (tipo.nombre_tipo === '' || tipo.descripcion === '') {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Campos vacios o invalidos',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			return;
		}
		try {
			const data = {
				nombre_tipo: tipo.nombre_tipo.toUpperCase(),
				descripcion: tipo.descripcion.toUpperCase(),
			};
			const response = await tiposApi.createTipo(data);
			if (response) {
				await Swal.fire({
					icon: 'success',
					title: 'Exito',
					text: 'Tipo creado exitosamente',
					showConfirmButton: true,
					confirmButtonColor: '#3085d6',
				});
				router.push('/dashboard/tipos');
			}
		} catch (error: any) {
			await Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al crear tipo',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			console.error(error);
		}
	};

	const [imageThumbnail, setImageThumbnail] = useState({
		nombre_modelo: '',
		tipo_archivo: '',
		path_archivo: '',
		descripcion: '',
	});

	const handleThumbnailFileChange = async (e: any) => {
		if (e.target.files) {
			const formData = new FormData();
			formData.append('folder', 'public/catalogo/icons/');
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setTipo({
			...tipo,
			[name]: value,
		});
	};

	const limpiar = () => {
		setTipo({
			nombre_tipo: '',
			descripcion: '',
		});
	};

	return (
		<main className='flex flex-col bg-white text-black w-full'>
			<div className='mx-6'>
				<h1 className='my-6 text-xl md:text-3xl flex items-center justify-center'>Crear Tipo</h1>
				{/* <!-- Filtros --> */}
				<div className='grid grid-cols-12 gap-2 w-full'>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Nombre de Tipo:</label>
						<input
							type='text'
							name='nombre_tipo'
							value={tipo.nombre_tipo}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese tipo de pieza (Cuenco, Olla, Figurina, etc.)'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Descripcion:</label>
						<textarea
							name='descripcion'
							value={tipo.descripcion}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese descripcion'
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className='grid grid-cols-12 gap-2 w-full shadow-md p-4 border'>
					<div className='col-span-12'>
						<h3 className='text-lg'>Imagen de Icono del tipo de pieza</h3>
						<h3 className='mt-6'>Icono (125px - 125px)</h3>
						<input type='file' onChange={handleThumbnailFileChange} className='w-full mt-2' />
					</div>
				</div>

				<div className='flex flex-row gap-2 items-center justify-center w-full mt-4'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
						onClick={sendTipo}
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
