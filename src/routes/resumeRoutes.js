import express from 'express'
import * as resumeController from '../controllers/resumeController.js'
import * as authentication from '../middlewares/authentication.js'

const router = express.Router()

router
    .get('/resume/:year/:month', authentication.bearer, resumeController.resume)

export default router