// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import maceBrand from './src/assets/mace-brand.png';
import { ebnfLanguage } from './src/expressive-code/ebnf-language.mjs';
import { maceLanguage } from './src/expressive-code/mace-language.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://mace-docs.onrender.com',
	redirects: {
		'/reference/motivation': '/tour/motivation',
		'/reference/block-overview': '/tour/block-overview',
		'/reference/type-system-overview': '/tour/type-system-overview',
		'/reference/docs': '/tour/doc-syntax',
		'/reference/type-aliases': '/tour/type-system-overview',
		'/reference/match-expressions': '/reference/choice',
		'/reference/variant': '/reference/variants',
		'/reference/cli': '/how-to/cli-reference',
	},
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
					langs: [maceLanguage, ebnfLanguage],
					themes: {
						dark: 'material-theme-darker',
						light: 'material-theme-lighter',
					},
					injectLangsIntoNestedCodeBlocks: true,
				},
			},
			sidebar: [
				{
					label: 'Tour',
					items: [
						{ label: 'Motivation', link: '/tour/motivation/' },
						{ label: 'Block Overview', link: '/tour/block-overview/' },
						{ label: 'Type System Overview', link: '/tour/type-system-overview/' },
						{ label: 'Script Block', link: '/tour/script-block/' },
						{ label: 'Output Block', link: '/tour/output-block/' },
						{ label: 'Doc Syntax', link: '/tour/doc-syntax/' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ autogenerate: { directory: 'reference' } }
					],
				},
				{
					label: 'Tutorials',
					items: [{ autogenerate: { directory: 'tutorials' } }],
				},
				{
					label: 'How-to Guides',
					items: [{ autogenerate: { directory: 'how-to' } }],
				},
				{
					label: 'Explanation',
					items: [{ autogenerate: { directory: 'explanation' } }],
				},
			],
		}),
	],
});
