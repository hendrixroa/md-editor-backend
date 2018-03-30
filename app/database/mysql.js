const mysql = require('mysql')
const config = require('../config/config').BD
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: config.dbname,
  port: config.port
})

connection.connect( (err) => {
	if(!err){
		console.log("Database is connected")
	}else{
		console.log("Error connecting database " + err)	   
	}
})

module.exports = connection