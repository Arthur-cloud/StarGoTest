const controller = require('../controllers/auth-controller')


module.exports = (app) => {
    app.post('/auth/registration', controller.registration)

    app.post('/auth/login', controller.login)
}