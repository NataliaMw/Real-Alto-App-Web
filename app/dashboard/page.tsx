import Link from 'next/link';
import { FaMonument } from 'react-icons/fa';

export default function Dashboard() {
	return (
		<main className='flex flex-col items-center justify-center bg-white text-black h-screen w-full'>
			<div className='flex flex-col text-black justify-center items-center gap-6'>
				<FaMonument size={120} />
				<Link href='/' className='self-center flex flex-col'>
					<span className='self-center text-6xl whitespace-nowrap'>MUSEO</span>
					<span className='self-center text-3xl whitespace-nowrap'>REAL ALTO</span>
				</Link>
			</div>
			<h2 className='self-center px-4 mx-4 mt-12 text-xl font-semibold text-center tracking-wide'>
				Desde Dashboard Museo Real Alto, realiza las actualizaciones necesarias para que el museo este listo para el
				público.
			</h2>
		</main>
	);
}
