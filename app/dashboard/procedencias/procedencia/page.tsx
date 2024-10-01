'use client';
import { useState } from 'react';
import procedenciasApi from '@/app/libs/procedenciasApi';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Procedencia() {
	const router = useRouter();
	const [procedencia, setProcedencia] = useState({
		periodo_inicio: '',
		periodo_fin: '',
		origen: '',
		nivel_cronologico: 0,
		descripcion: '',
	});

	const sendProcedencia = async () => {
		if (
			procedencia.origen === '' ||
			procedencia.periodo_fin === '' ||
			procedencia.periodo_inicio === '' ||
			procedencia.descripcion === '' ||
			procedencia.nivel_cronologico < 0
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Complete todos los campos',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			return;
		}
		try {
			const data = {
				origen: procedencia.origen.toUpperCase(),
				periodo_inicio: procedencia.periodo_inicio.toUpperCase(),
				periodo_fin: procedencia.periodo_fin.toUpperCase(),
				descripcion: procedencia.descripcion.toUpperCase(),
				nivel_cronologico: procedencia.nivel_cronologico,
			};
			const response = await procedenciasApi.createProcedencia(data);
			if (response) {
				Swal.fire({
					icon: 'success',
					title: 'Procedencia creada',
					text: 'Procedencia creada con exito',
					showConfirmButton: true,
					confirmButtonColor: '#3085d6',
				});
				router.push('/dashboard/procedencias');
			}
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error al crear procedencia',
				showConfirmButton: true,
				confirmButtonColor: 'red',
			});
			console.error(error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setProcedencia({
			...procedencia,
			[name]: value,
		});
	};

	const limpiar = () => {
		setProcedencia({
			periodo_inicio: '',
			periodo_fin: '',
			origen: '',
			nivel_cronologico: 0,
			descripcion: '',
		});
	};

	return (
		<main className='flex flex-col bg-white text-black w-full'>
			<div className='mx-6'>
				<h1 className='my-6 text-xl md:text-3xl flex items-center justify-center'>Crear Procedencia</h1>
				{/* <!-- Filtros --> */}
				<div className='grid grid-cols-12 gap-2 w-full'>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Origen:</label>
						<input
							type='text'
							name='origen'
							value={procedencia.origen}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese origen'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Nivel Cronologico:</label>
						<input
							type='number'
							name='nivel_cronologico'
							min={0}
							value={procedencia.nivel_cronologico}
							className='w-full border border-gray-300 rounded px-3 py-2'
							placeholder='Ingrese el nivel cronologico (1, 2, ..., 7)'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Descripcion:</label>
						<input
							type='text'
							name='descripcion'
							value={procedencia.descripcion}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese descripcion'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Periodo Inicio:</label>
						<input
							type='text'
							name='periodo_inicio'
							value={procedencia.periodo_inicio}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese periodo de inicio (1200 AC)'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Periodo Fin:</label>
						<input
							type='text'
							name='periodo_fin'
							value={procedencia.periodo_fin}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese periodo de fin (1200 AC)'
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className='flex flex-row gap-2 items-center justify-center w-full mt-4'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
						onClick={sendProcedencia}
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
