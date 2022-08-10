const { User } = require('../db/index')
const bcrypt = require('bcrypt')
const ApiError = require('../errors/api-error')
const TokenService = require('../service/token-service')

class AuthController {

    async registration(req, res, next) {
        try {
            const { email, password } = req.body
            const candidat = await User.findOne({ email: email })
            if (!email || !password) {
                return next(ApiError.badRequest('Incorrect data'))
            }
            if (candidat) {
                return next(ApiError.badRequest('Email already taken'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, password: hashPassword })

            const userId = user.id
            const token = TokenService.generateJwt({ userId })

            const userWithToken = await User.findByIdAndUpdate(userId, { token: token })
            return res.json(userWithToken)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const candidat = await User.findOne({ email: email })
            if (!candidat) {
                return next(ApiError.internal('This email does not exist'))
            }
            let comparePassword = bcrypt.compareSync(password, candidat.password)
            if (!comparePassword) {
                return next(ApiError.internal('Invalid password'))
            }

            const candidatId = candidat.id
            const token = TokenService.generateJwt({candidatId})

            const user = await User.findByIdAndUpdate(candidatId, { token: token })
            return res.json({ token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()