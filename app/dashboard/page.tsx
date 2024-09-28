import Link from 'next/link';

export default function Dashboard() {
	return (
		<main
			className='flex flex-col items-center justify-center mt-12
         bg-white text-black h-screen'
		>
			<div className='flex flex-col text-black'>
				<Link href='/' className='self-center flex flex-col'>
					<span className='self-center text-6xl whitespace-nowrap'>MUSEO</span>
					<span className='self-center text-3xl whitespace-nowrap'>REAL ALTO</span>
				</Link>
			</div>
			<h2 className='self-center px-4 mx-4 mt-12 text-xl font-semibold text-center tracking-wide'>
				Desde Dashboard Museo Real Alto, realiza las actualizaciones necesarias para que el museo este listo para el
				publico.
			</h2>
		</main>
	);
}
