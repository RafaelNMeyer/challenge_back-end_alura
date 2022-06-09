    import express from 'express'
import * as reciptsController from '../controllers/reciptsController.js'
import * as authentication from '../middlewares/authentication.js'

const router = express.Router()

router
    .get('/recipts', authentication.bearer, reciptsController.listrecipts)
    .get('/recipts?description=', authentication.bearer, reciptsController.listrecipt)
    .get('/recipts/:id', authentication.bearer, reciptsController.listrecipt)
    .get('/recipts/:year/:month', authentication.bearer, reciptsController.listByDate)
    .post('/recipts', authentication.bearer, reciptsController.insertrecipt)
    .put('/recipts/:id', authentication.bearer, reciptsController.updaterecipt)
    .delete('/recipts/:id', authentication.bearer, reciptsController.deleterecipt)

export default router;