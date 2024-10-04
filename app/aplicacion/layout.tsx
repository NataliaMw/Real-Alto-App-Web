import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar'; // Importa el Navbar
import Footer from '@/app/components/Footer'; // Importa el Footer
import '@/app/globals.css';

export const metadata: Metadata = {
	title: 'Museo Real Alto',
	description: 'Pagina web del Museo Real Alto',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<Navbar /> {/* Añade el Navbar globalmente */}
				{children}
				<Footer /> {/* Añade el Footer globalmente */}
			</body>
		</html>
	);
}
