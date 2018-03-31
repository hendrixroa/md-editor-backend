module.exports.Auth = () => {
  const bcrypt = require('bcryptjs')
  const jwt = require('../middlewares/jwt').JWT()
  const validator = require('../utils/Validators').Validators()
  const db = require('../database/LowDB').LowDB()
  const config = require('../config/config').server

  const login = async (req, res) => {
    if(!req.body.password || !req.body.email)
      return res.status(403).send({ status: 403, body: 'Email and pass are required'})
    if(!validator.validateEmail(req.body.email))
      return res.status(403).send({status:403, body: 'Wrong format email'})
    const user = await db.getBy('users', {email: req.body.email}).catch(err => { res.status(404).json({status: 404, body: 'Wrong email or password'}) })   
    if (user === undefined || user.password === undefined || !bcrypt.compareSync(String(req.body.password), String(user.password))) return res.status(404).send({status: 404, body: 'Wrong email or password'})
    const token = jwt.signToken({
      id: user.id,
      username: user.email,
    }, config.secret, {
      expiresIn: '12h'
    })
    res.status(200).send({ status: 200, auth: true, token: token, email: user.email })
  }

  return {
    login: login
  }
}