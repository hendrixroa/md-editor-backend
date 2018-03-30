module.exports.Post = () => {
  const sh = require('shorthash')
  const db = require('../database/querys').Querys()

  const listPosts = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM posts;', [])
    res.send(rows[0])
  }

  const createPost = async (req, res) => {
    const rows = await db.query('INSERT INTO md_editor.posts (post) values (?);', [req.body.post])
    res.json(rows)
  }

  const editPost = () => {
    
  }

  const deletePost = () => {
    
  }

  return {
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost
  }
}