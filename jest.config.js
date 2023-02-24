module.exports = {
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {presets: ['next/babel']}]
	},
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/components/$1'
	},
	testEnvironment: 'jsdom'
}
