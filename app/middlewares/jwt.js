module.exports.JWT = () => {
	const jwt = require('jsonwebtoken')
  const config = require('../config/config')

	const verifyToken = (req, res, next) => {
		const token = req.headers['x-access-token']
  	if (!token) return res.status(403).send({ auth: false, message: 'El token es requerido' })
		try{
			const isValid = jwt.verify(token, config.secret)
			if(isValid.id){
				req.userLogged = isValid
				next()
			}
		}catch(e){
			return res.status(403).send({ auth: false, message: e.message })
		}  
	}

	const signToken = (objData, secret, options) => {
		return jwt.sign(objData, secret, options)
	} 

	return {
		verifyToken: verifyToken,
		signToken: signToken
	}
}