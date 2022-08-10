const jwt = require('jsonwebtoken')
const config = require('../../config/index')

class TokenService {
    generateJwt = (id) => {
        const token = jwt.sign(id, config.SECRET_KEY, { expiresIn: '24h' })
        return token
    }

    getValidToken = (req) => {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const userData = jwt.verify(token, config.SECRET_KEY)
        return userData
    }
}

module.exports = new TokenService()