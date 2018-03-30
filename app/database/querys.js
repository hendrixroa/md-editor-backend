module.exports.Querys = () => {
  const connection = require('./mysql')

  const query = (sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, rows, fields) => {
        if(err != null){
          console.log(err)
          reject(err)
        }else{
          resolve({'results': rows })
        }		
      })
    })
  }

  return {
    query: query
  }
}