import express from 'express'
import * as userController from '../controllers/userController.js'
import * as authentication from '../middlewares/authentication.js'

const router = express.Router()

router
    .post('/user', authentication.bearer, userController.userByEmail)
    .post('/register', userController.createUser)
    .post('/login', authentication.local, userController.login)
    .post('/logout', [authentication.refresh, authentication.bearer], userController.logout)
    .post('/updateToken', authentication.refresh, userController.login)

export default router