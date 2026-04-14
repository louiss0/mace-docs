// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { maceLanguage } from './src/expressive-code/mace-language.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://mace-docs.onrender.com',
	integrations: [
		starlight({
			title: 'Mace Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/louiss0/mace' }],
			expressiveCode: {
				shiki: {
					langs: [maceLanguage],
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
