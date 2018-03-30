module.exports = {
	BD: {
		host: process.env.HOSTBD,
		database: process.env.DATABASE,
		port: process.env.PORTBD,
		user: process.env.USERBD,
		pass: process.env.PASSWORDBD
	},
	server: {
		port: 3000,
		secret: 'yourSecretValueOntheServer'
	}
}