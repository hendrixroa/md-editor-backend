module.exports.Post = () => {
  const sh = require('shorthash')
  const db = require('../database/querys').Querys()

  const listPosts = async (req, res) => {
    const rows = await db.query('SELECT * FROM md_docs.documents;', []).catch(err => { res.status(403).json({ body: err }) })
    res.json(rows)
  }

  const createPost = async (req, res) => {
    if(!req.body.post)
      return res.status(403).send({ status: 403, message: 'The post is required'}).catch(err => { res.status(403).json({ body: err }) })
    const rows = await db.query('INSERT INTO md_docs.documents (post) VALUES (?);', [req.body.post])
    res.json(rows)
  }

  const editPost = async (req, res) => {
    if(!req.body.post)
      return res.status(403).send({ status: 403, message: 'The post is required'}).catch(err => { res.status(403).json({ body: err }) })
    const rows = await db.query('UPDATE md_docs.documents SET post = ? WHERE id = ?;', [req.body.post, req.params.id])
    res.json(rows)
  }

  const deletePost = async (req, res) => {
    const rows = await db.query('DELETE FROM md_docs.documents WHERE id = ?;', [req.params.id]).catch(err => { res.status(403).json({ body: err }) })
    res.json(rows)
  }

  return {
    listPosts: listPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost
  }
}