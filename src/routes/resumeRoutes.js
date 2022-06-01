import express from 'express'
import * as resumeController from '../controllers/resumeController.js'

const router = express.Router()

router
    .get('/resume/:year/:month', resumeController.resume)

export default router