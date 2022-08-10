const ApiError = require('../errors/api-error')
const { Item } = require('../db/index')
const TokenService = require('../service/token-service')

class UserController {
    //Create todo item
    async createItem(req, res, next) {
        try {
            const {name} = req.body
            const token = TokenService.getValidToken(req)
            const userId = token.candidatId
            if(!name) {
                return next(ApiError.badRequest('Not all data has been entered'))
            }

            const item = await Item.create({author: userId, name: name})
            return res.json(item)

        } catch (error) {
            console.log(error)
        }
    }
    //Update todo item
    async updateItem(req, res, next) {
        try {
            const {name, newName} = req.body
            const token = TokenService.getValidToken(req)
            const userId = token.candidatId

            const candidatItem = await Item.findOne({author: userId, name: name})
            if(!name || !newName) {
                return next(ApiError.badRequest('Not all data has been entered'))
            }
            if(!candidatItem) {
                return next(ApiError.badRequest('You are not the author or the post does not exist'))
            }

            const item = await Item.findByIdAndUpdate(candidatItem.id, {name: newName})
            return res.json({message: `You have successfully changed the name to: ${newName}`})
        } catch (error) {
            next(error)
        }
    }
    //Delete todo item
    async deleteItem(req, res, next) {
        try {
            const {name} = req.body
            const token = TokenService.getValidToken(req)
            const userId = token.candidatId
            const candidatItem = await Item.findOne({author: userId, name: name})
            if(!name) {
                return next(ApiError.badRequest('Not all data has been entered'))
            }
            if(!candidatItem) {
                return next(ApiError.badRequest('You are not the author or the post does not exist'))
            }

            const removedItem = await Item.deleteOne({author: userId, name: name})
            return res.json({message: `You have successfully deleted an item by name: ${name}`})
        } catch (error) {
            next(error)
        }
    }
    //Get by Id
    async getById(req, res, next) {
        try {
            const { id } = req.params
            const token = TokenService.getValidToken(req)
            const userId = token.candidatId
            const candidatItem = await Item.findOne({author: userId, _id: id})
            if(!id) {
                return next(ApiError.badRequest('Not all data has been entered'))
            }
            if(!candidatItem) {
                return next(ApiError.badRequest('You are not the author or the post does not exist'))
            }

            return res.json(candidatItem)
        } catch (error) {
            next(error)
        }
    }
    //Mark as completed todo
    async updateMarkCompleted(req, res, next) {
        try {
            const { name , isCompleted } = req.body
            const token = TokenService.getValidToken(req)
            const userId = token.candidatId
            const candidatItem = await Item.findOne({author: userId, name: name})
            if(!name) {
                return next(ApiError.badRequest('Not all data has been entered'))
            }
            if(!candidatItem) {
                return next(ApiError.badRequest('You are not the author or the post does not exist'))
            }

            if(typeof(isCompleted) != "boolean") {
                return next(ApiError.badRequest('Wrong data. Try using true or false'))
            }
            
            const item = await Item.findByIdAndUpdate(candidatItem.id, {isCompleted : isCompleted} )
            return res.json({message: `Completed mark successfully changed to: ${isCompleted}`})
        } catch (error) {
            next(error)
        }
    }
    //Get all user todo items with query filter completed=false/true
    async getUserWithFilter(req, res, next) {
        try {
            const { isCompleted } = req.body
            const token = TokenService.getValidToken(req)
            const userId = token.candidatId
            const items = await Item.find({author: userId, isCompleted: isCompleted})
            res.json(items)
            if(!candidatItem) {
                return next(ApiError.badRequest('You are not the author or the post does not exist'))
            }

            if(typeof(isCompleted) != "boolean") {
                return next(ApiError.badRequest('Wrong data. Try using true or false'))
            }
             
            res.json(items)
        } catch (error) {
            next(error) 
        }
    }
}

module.exports = new UserController()