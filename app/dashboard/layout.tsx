import type { Metadata } from 'next';
import Link from 'next/link';
import { FaPuzzlePiece } from 'react-icons/fa';

export const metadata: Metadata = {
	title: 'Dashboard Real Alto',
	description: 'Dashboard de recursos de Real Alto',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className={'font-robotSlap bg-white grid grid-cols-12 w-screen my-auto'}>
			<div className='col-span-2 bg-slate-800 flex flex-col gap-2 items-center text-white'>
				<div className='mt-12 text-xl'>
					<Link href='/dashboard'>Dashboard</Link>
				</div>
				<hr className='border-white border-t-2 w-[80%] mt-2' />
				<div className='mx-2 mt-6 flex flex-col gap-2 justify-center w-fit'>
					<div className='hover:border hover:border-white border border-transparent rounded p-2 mx-4 items-center justify-center flex'>
						<Link href={'/dashboard/piezas'} className='flex flex-row gap-2 w-full items-center'>
							<FaPuzzlePiece size={16} className='mr-2' />
							<div>Gestion de piezas</div>
						</Link>
					</div>
					<div className='hover:border hover:border-white border border-transparent rounded p-2 mx-4 items-center justify-center flex'>
						<Link href={'/dashboard/procedencias'} className='flex flex-row w-full gap-2 items-center'>
							<FaPuzzlePiece size={16} className='mr-2' />
							<div>Gestion de procedencias</div>
						</Link>
					</div>
					<div className='hover:border hover:border-white border border-transparent rounded p-2 mx-4 items-center justify-center flex'>
						<Link href={'/dashboard/tipos'} className='flex flex-row w-full gap-2 items-center'>
							<FaPuzzlePiece size={16} className='mr-2' />
							<div>Gestion de tipos</div>
						</Link>
					</div>
					<div className='hover:border hover:border-white border border-transparent rounded p-2 mx-4 items-center justify-center flex'>
						<Link href={'/dashboard/usos'} className='flex flex-row w-full gap-2 items-center'>
							<FaPuzzlePiece size={16} className='mr-2' />
							<div>Gestion de usos</div>
						</Link>
					</div>
				</div>
			</div>
			<div className='col-span-10 flex flex-col items-center'>{children}</div>
		</main>
	);
}
