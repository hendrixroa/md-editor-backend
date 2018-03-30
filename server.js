const express = require("express");
const app = express()
const parser = require('body-parser')
const config = require('./app/config/config')
const jwt = require('./app/middlewares/jwt').JWT()
const post = require('./app/controllers/post').Post()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
  next()
})

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))              
app.use(parser.text())                                    
app.use(parser.json({ type: 'application/json'}))

app.route('/post')
  .get(post.listPosts)
  .post(post.createPost)

app.route('/post/:id')
  .put(post.editPost)
  .delete(post.deletePost)
 
const port = process.env.PORT || config.server.port
const server = app.listen(port, () => {
  console.log('Server init on port: ', port)
})