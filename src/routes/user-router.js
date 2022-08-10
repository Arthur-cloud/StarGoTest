const controller = require('../controllers/user-controller')
const authMiddleware = require('../middlewares/auth-middleware')

module.exports = (app) => {
    app.post('/todo/create', authMiddleware ,controller.createItem)

    app.patch('/todo/updateMark', authMiddleware ,controller.updateMarkCompleted)

    app.patch('/todo/updateItem', authMiddleware ,controller.updateItem)

    app.delete('/todo/delete', authMiddleware ,controller.deleteItem)

    app.get('/todo/getById/:id', authMiddleware ,controller.getById)

    app.get('/todo/getUserWithFilter', authMiddleware ,controller.getUserWithFilter)
}