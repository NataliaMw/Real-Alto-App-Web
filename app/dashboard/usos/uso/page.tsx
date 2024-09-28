'use client';
import { useState } from 'react';
import usosApi from '@/app/libs/usosApi';
import { useRouter } from 'next/navigation';
export default function Uso() {
	const router = useRouter();
	const [uso, setUso] = useState({
		nombre_uso: '',
		descripcion: '',
	});

	const sendUso = async () => {
		console.log(uso);
		if (uso.nombre_uso === '' || uso.descripcion === '') {
			alert('Existen campos vacios o invalidos.');
			return;
		}
		try {
			const data = {
				nombre_uso: uso.nombre_uso.toUpperCase(),
				descripcion: uso.descripcion.toUpperCase(),
			};
			const response = await usosApi.createUso(data);
			if (response) {
				router.push('/dashboard/usos');
			}
		} catch (error: any) {
			console.error(error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setUso({
			...uso,
			[name]: value,
		});
	};

	const limpiar = () => {
		setUso({
			nombre_uso: '',
			descripcion: '',
		});
	};

	return (
		<main className='flex flex-col bg-white text-black w-full'>
			<div className='mx-6'>
				<h1 className='my-6 text-xl md:text-3xl flex items-center justify-center'>Crear Uso</h1>
				{/* <!-- Filtros --> */}
				<div className='grid grid-cols-12 gap-2 w-full'>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Nombre de Uso:</label>
						<input
							type='text'
							name='nombre_uso'
							value={uso.nombre_uso}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese uso de pieza (Ritual, Cotidiano, etc.)'
							onChange={handleInputChange}
						/>
					</div>
					<div className='col-span-12 md:col-span-6'>
						<label className='block text-gray-700'>Descripcion:</label>
						<textarea
							name='descripcion'
							value={uso.descripcion}
							className='w-full border border-gray-300 rounded px-3 py-2 uppercase'
							placeholder='Ingrese descripcion'
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className='flex flex-row gap-2 items-center justify-center w-full mt-4'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
						onClick={sendUso}
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
