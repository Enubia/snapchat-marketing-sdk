module.exports = {
	root: true,
	extends: ['@hokify/eslint-config'],
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	rules: {
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/interface-name-prefix': 0
	},
};
