module.exports.Documents = () => {
  const db = require('../database/LowDB').LowDB()
  const v1 = require('uuid/v1')
  
  const listDocuments = async (req, res) => {
    res.json(await db.get('documents'))
  }

  const createDocument = async (req, res) => {
    if(!req.body.document)
      return res.status(403).send({ status: 403, message: 'The document is required'}).catch(err => { res.status(403).json({ body: err }) })
    const objCreate = {
      id: String(v1()),
      document: req.body.document,
      created_at: String(new Date()),
      updated_at: String(new Date())
    }
    db.create('documents', objCreate)
    res.json({status: 200, body: 'Insert Succsess'})
  }

  const editDocument = async (req, res) => {
    if(!req.body.document || !req.params.id)
      return res.status(403).send({ status: 403, message: 'The document and id is required'})
    db.updateBy('documents', req.params.id, 'document', req.body.document)
    res.json({status: 200, body: 'Document updated'})
  }

  const deleteDocument = async (req, res) => {
    if(!req.params.id)
      return res.status(403).send({ status: 403, message: 'The id is required'})
    db.remove('documents', req.params.id)
    res.json({status: 200, body: 'Document deleted'})
  }

  return {
    listDocuments: listDocuments,
    createDocument: createDocument,
    editDocument: editDocument,
    deleteDocument: deleteDocument
  }
}