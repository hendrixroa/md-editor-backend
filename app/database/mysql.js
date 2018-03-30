const mysql = require('mysql')
const config = require('../config/config').BD
const connection = mysql.createConnection(config.url)

connection.connect( (err) => {
	if(!err){
		console.log("Database is connected")
	}else{
		console.log("Error connecting database " + err)	   
	}
})

module.exports = connection