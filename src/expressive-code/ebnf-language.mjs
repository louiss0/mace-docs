export const ebnfLanguage = {
	name: 'ebnf-custom',
	displayName: 'EBNF',
	scopeName: 'source.ebnf',
	aliases: ['ebnf', 'bnf'],
	fileTypes: ['ebnf', 'bnf'],
	patterns: [
		{ include: '#comments' },
		{ include: '#headings' },
		{ include: '#specialSequence' },
		{ include: '#terminalString' },
		{ include: '#numbers' },
		{ include: '#operators' },
		{ include: '#brackets' },
		{ include: '#delimiters' },
		{ include: '#identifiers' },
	],
	repository: {
		comments: {
			name: 'comment.block.ebnf',
			begin: '\\(\\*',
			end: '\\*\\)',
		},
		headings: {
			name: 'markup.heading.title.ebnf',
			match: '^#{1,6}\\s+.*$',
		},
		specialSequence: {
			name: 'string.other.special.ebnf',
			match: '\\?[^?\\r\\n]*\\?',
		},
		terminalString: {
			patterns: [
				{
					name: 'string.quoted.single.ebnf',
					match: "'[^'\\r\\n]+'",
				},
				{
					name: 'string.quoted.double.ebnf',
					match: '"[^"\\r\\n]+"',
				},
			],
		},
		numbers: {
			name: 'constant.numeric.integer.ebnf',
			match: '\\b\\d+\\b',
		},
		operators: {
			name: 'keyword.operator.ebnf',
			match: '::=|=|\\.\\.\\.|…|[=;.|/,*-]',
		},
		brackets: {
			name: 'punctuation.section.brackets.ebnf',
			match: '[\\[\\]]',
		},
		delimiters: {
			name: 'punctuation.section.delimiters.ebnf',
			match: '[(){}]',
		},
		identifiers: {
			name: 'constant.other.ebnf',
			match: '\\b[A-Za-z0-9_]+\\b',
		},
	},
};
