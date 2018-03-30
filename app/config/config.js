module.exports = {
	BD: {
		url: process.env.DATABASE_URL,
		database: process.env.DATABASE
	},
	server: {
		port: 3000,
		secret: 'yourSecretValueOntheServer'
	}
}