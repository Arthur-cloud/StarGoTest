const jwt = require('jsonwebtoken')
const ApiError = require('../errors/api-error')
const config = require('../config/index')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(ApiError.Unauthorized())
        }
        const decoded = jwt.verify(token, config.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return next(ApiError.Unauthorized())
    }
};