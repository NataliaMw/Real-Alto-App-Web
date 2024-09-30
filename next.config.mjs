/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['tsx', 'ts', 'js', 'jsx', 'mjs'], // Añade 'mjs' si es necesario
	// Otras configuraciones que puedas necesitar
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true,
			},
			{
				source: '/catalogo/piezas/tipo',
				destination: '/categorias',
				permanent: true,
			},
			{
				source: '/catalogo/piezas/uso',
				destination: '/categorias',
				permanent: true,
			},
			{
				source: '/catalogo/piezas/procedencia',
				destination: '/categorias',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
