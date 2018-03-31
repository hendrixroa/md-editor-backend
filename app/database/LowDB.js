module.exports.LowDB = () => {
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  const adapter = new FileSync('db.json')
  const db = low(adapter)

  if(db.getState().documents === undefined){
    db.defaults({ documents: [] })
      .write()
  }

  const get = async (table) => {
    const items = await db.get(table).value()
    return items
  }

  const getBy = async (table, obj) => {
    const items = await db.get(table).find(obj).value()
    return items
  }

  const create = (table, item) => {
    db.get(table)
      .push(item)
      .write()
  }

  const updateBy = (table, id, fieldName, newValue) => {
    db.get(table).find({ id: id })
      .assign({ 
        [fieldName]: newValue,
        updated_at: String(new Date())
       })
      .write()
  }

  const update = (table, item) => {
    db.get(table)
    .find({id: item.id})
    .assign(item)
    .value()
  }

  const remove = (table, id) => {
    db.get(table)
    .remove({ id: id })
    .write()
  } 

  return {
    create: create,
    get: get,
    getBy: getBy,
    updateBy: updateBy,
    remove: remove
  }
}