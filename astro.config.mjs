// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import maceBrand from './src/assets/mace-brand.png';
import { maceLanguage } from './src/expressive-code/mace-language.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://mace-docs.onrender.com',
	integrations: [
		starlight({
			title: 'Mace Docs',
			logo: {
				src: maceBrand,
				alt: 'Mace',
			},
			customCss: ['./src/styles/brand.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/louiss0/mace' }],
			expressiveCode: {
				shiki: {
					langs: [maceLanguage],
					themes: {
						dark: 'material-theme-darker',
						light: 'material-theme-lighter',
					},
					injectLangsIntoNestedCodeBlocks: true,
				},
			},
			sidebar: [
				{
					label: 'Tutorials',
					autogenerate: { directory: 'tutorials' },
				},
				{
					label: 'How-to Guides',
					autogenerate: { directory: 'how-to' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Explanation',
					autogenerate: { directory: 'explanation' },
				},
			],
		}),
	],
});
