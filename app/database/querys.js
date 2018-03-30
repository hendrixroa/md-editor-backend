module.exports.Querys = () => {
  const connection = require('./mysql')

  const query = (sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, rows, fields) => {
        if(err != null){
          console.log(err)
          connection.end()
          reject(err)
        }else{
          connection.end()
          resolve({'body': rows, status: 200 })
        }		
      })
    })
  }

  return {
    query: query
  }
}