module.exports = {
	root: true,
	extends: ['@hokify/eslint-config'],
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-unused-vars': 0
	},
};
