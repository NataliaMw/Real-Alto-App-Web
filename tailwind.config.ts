import { vendored } from 'next/dist/server/future/route-modules/app-page/module.compiled';
import type { Config } from 'tailwindcss';
var flowbitePlugin = require('flowbite/plugin');

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'node_modules/flowbite-react/dist/esm/**/*.mjs',
	],
	theme: {
		extend: {
			colors: {
				naranja: '#d37728',
				vector1: '#c7b2a6',
				vector2: '#d1b2ab',
				vector3: '#cc9e91',
				vector4: '#cc8f7a',
				vector5: '#d9805c',
				vector6: '#b06340',
				vector7: '#8f5233',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},

			fontFamily: {
				erode: ['Erode', 'sans-serif'],
				robotSlap: ['Robot Slap', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},

			fontWeight: {
				light: '300',
				normal: '400',
				semibold: '600',
				bold: '700',
				black: '900',
			},

			fontStyle: {
				normal: 'normal',
				italic: 'italic',
			},

			fontSize: {},
		},
	},
	plugins: [flowbitePlugin],
};
export default config;
