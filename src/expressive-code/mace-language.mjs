export const maceLanguage = {
	name: 'mace-custom',
	displayName: 'Mace',
	scopeName: 'source.mace',
	aliases: ['mace'],
	fileTypes: ['mace'],
	patterns: [
		{ include: '#comments' },
		{ include: '#scriptDelimiter' },
		{ include: '#blockString' },
		{ include: '#doubleString' },
		{ include: '#singleString' },
		{ include: '#inlineDescription' },
		{ include: '#declarations' },
		{ include: '#selfReference' },
		{ include: '#fieldNames' },
		{ include: '#keywords' },
		{ include: '#constants' },
		{ include: '#numbers' },
		{ include: '#operators' },
	],
	repository: {
		comments: {
			patterns: [
				{
					name: 'comment.block.mace',
					begin: '/=(?=[^\\n]*=/)',
					end: '=/',
				},
				{
					name: 'comment.line.mace',
					match: '/=.*$',
				},
			],
		},
		scriptDelimiter: {
			name: 'punctuation.section.embedded.mace',
			match: '\\|={3,}\\|',
		},
		inlineDescription: {
			name: 'comment.line.documentation.mace',
			match: '/#.*$',
		},
		singleString: {
			name: 'string.quoted.single.mace',
			begin: "'",
			end: "'",
			patterns: [{ include: '#escapes' }],
		},
		doubleString: {
			name: 'string.quoted.double.mace',
			begin: '"',
			end: '"',
			patterns: [{ include: '#escapes' }, { include: '#interpolation' }],
		},
		blockString: {
			name: 'string.quoted.triple.mace',
			begin: '"""',
			end: '"""',
			patterns: [{ include: '#escapes' }, { include: '#interpolation' }],
		},
		escapes: {
			name: 'constant.character.escape.mace',
			match: '\\\\(?:\\\\|\'|"|n|r|t)',
		},
		interpolation: {
			name: 'meta.interpolation.mace',
			begin: '\\$\\(',
			beginCaptures: {
				0: { name: 'punctuation.section.interpolation.begin.mace' },
			},
			end: '\\)',
			endCaptures: {
				0: { name: 'punctuation.section.interpolation.end.mace' },
			},
			patterns: [
				{ include: '#selfReference' },
				{ include: '#keywords' },
				{ include: '#constants' },
				{ include: '#numbers' },
				{ include: '#operators' },
			],
		},
		declarations: {
			patterns: [
				{
					match: '\\b(from|import|type|schema|gen_doc|schema_doc|enum|injectable)\\b',
					captures: {
						1: { name: 'keyword.control.mace' },
					},
				},
				{
					match: '\\b(type|schema|enum|gen_doc|schema_doc)\\s+([A-Za-z][A-Za-z0-9_]*)',
					captures: {
						1: { name: 'keyword.declaration.mace' },
						2: { name: 'entity.name.type.mace' },
					},
				},
				{
					match: '\\bfrom\\b\\s+("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')',
					captures: {
						1: { name: 'string.quoted.double.mace' },
					},
				},
			],
		},
		selfReference: {
			name: 'variable.language.mace',
			match: '\\$self\\b',
		},
		fieldNames: {
			patterns: [
				{
					name: 'variable.other.member.mace',
					match: '\\b[A-Za-z][A-Za-z0-9_]*\\b(?=\\??\\s*:)',
				},
				{
					name: 'entity.name.type.mace',
					match: '(?<=\\bschema\\s*=\\s*)[A-Za-z][A-Za-z0-9_]*\\b',
				},
				{
					name: 'variable.other.enummember.mace',
					match: '(?<=\\.)[A-Za-z][A-Za-z0-9_]*\\b',
				},
			],
		},
		keywords: {
			name: 'keyword.control.mace',
			match: '\\b(output|schema_file|summary|description|props|array|union|variant)\\b',
		},
		constants: {
			patterns: [
				{
					name: 'storage.type.primitive.mace',
					match: '\\b(string|int|float|boolean)\\b',
				},
				{
					name: 'constant.language.boolean.mace',
					match: '\\b(true|false)\\b',
				},
				{
					name: 'constant.language.mode.mace',
					match: '\\b(data|schema)\\b',
				},
			],
		},
		numbers: {
			patterns: [
				{
					name: 'constant.numeric.float.mace',
					match: '\\b\\d+\\.\\d+\\b',
				},
				{
					name: 'constant.numeric.integer.mace',
					match: '\\b\\d+\\b',
				},
			],
		},
		operators: {
			patterns: [
				{
					name: 'keyword.operator.mace',
					match: '===|!==|==|!=|<=|>=|>>>|>>|<<|&&|\\|\\||\\*\\*|[=:+\\-*/%!?~&^|<>.]',
				},
				{
					name: 'punctuation.separator.mace',
					match: '[,;]',
				},
				{
					name: 'punctuation.section.brackets.mace',
					match: '[(){}\\[\\]]',
				},
			],
		},
	},
};
