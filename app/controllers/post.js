module.exports.Post = () => {
  const sh = require('shorthash')
  const db = require('../database/querys').Querys()

  const listPosts = async (req, res) => {
    const rows = await db.query('SELECT * FROM md_editor.posts;', [])
    res.json(rows)
  }

  const createPost = async (req, res) => {
    if(!req.body.post)
      return res.status(403).send({ status: 403, message: 'The post is required'})
    const rows = await db.query('INSERT INTO md_editor.posts (post) VALUES (?);', [req.body.post])
    res.json(rows)
  }

  const editPost = async (req, res) => {
    if(!req.body.post)
      return res.status(403).send({ status: 403, message: 'The post is required'})
    const rows = await db.query('UPDATE md_editor.posts SET post = ? WHERE id = ?;', [req.body.post, req.params.id])
    res.json(rows)
  }

  const deletePost = async (req, res) => {
    const rows = await db.query('DELETE FROM md_editor.posts WHERE id = ?;',  [req.params.id])
    res.json(rows)
  }

  return {
    listPosts: listPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost
  }
}