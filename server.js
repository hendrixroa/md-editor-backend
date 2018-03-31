const express = require("express");
const app = express()
const parser = require('body-parser')
const config = require('./app/config/config')
const jwt = require('./app/middlewares/jwt').JWT()
const document = require('./app/controllers/documents').Documents()
const auth = require('./app/controllers/auth').Auth()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next()
})

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))              
app.use(parser.text())                                    
app.use(parser.json({ type: 'application/json'}))

app.route('/auth')
  .post(auth.login)

app.route('/document')
  .get(jwt.verifyToken, document.listDocuments)
  .post(jwt.verifyToken, document.createDocument)

app.route('/document/:id')
  .put(jwt.verifyToken, document.editDocument)
  .delete(jwt.verifyToken, document.deleteDocument)
  
const port = process.env.PORT || config.server.port
const server = app.listen(port, () => {
  console.log('Server init on port: ', port)
})