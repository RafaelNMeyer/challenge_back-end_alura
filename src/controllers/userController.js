import * as userService from '../services/userService.js'
import * as accessTokens from '../tokens/accessToken.js'

async function createUser(req, res, next){
    try{
        const result = await userService.createUser(req.body)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'UserError') return res.status(error.status).send(error.name)
        return next(error)
    }
}

async function userByEmail(req, res, next){
    try{
        const {email} = req.body
        const result = await userService.userByEmail(email)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'UserError') return res.status(error.status).send(error.name)
        return next(error)
    }
}

async function login(req, res, next){
    try{
        const {id} = req.user
        const accessToken = await accessTokens.createJwtToken(id)
        res.set('Authorization', accessToken);
        res.status(200).send({accessToken: accessToken})
    }catch(error){
        res.status(500).send(error.message)
    }
}

export {createUser, login, userByEmail}