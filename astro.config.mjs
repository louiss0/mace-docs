// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { maceLanguage } from './src/expressive-code/mace-language.mjs';

// https://astro.build/config
export default defineConfig({
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
					label: 'Guides',
					items: [
						{ label: 'Getting Started', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
