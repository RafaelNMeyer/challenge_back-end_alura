import * as userService from '../services/userService.js'
import * as accessTokens from '../tokens/accessToken.js'
import * as refreshTokens from '../tokens/refreshToken.js'

async function createUser(req, res, next){
    try{
        const result = await userService.createUser(req.body)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'UserError') return res.status(error.status).send({error: error.message})
        return next(error)
    }
}

async function userByEmail(req, res, next){
    try{
        const {email} = req.body
        const result = await userService.userByEmail(email)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'UserError') return res.status(error.status).send({error: error.message})
        return next(error)
    }
}

async function login(req, res, next){
    try{
        const {id} = req.user
        const accessToken = await accessTokens.createJwtToken(id)
        const refreshToken = await refreshTokens.createRefreshToken(id)
        res.set('Authorization', accessToken);
        res.status(200).send({refreshToken: refreshToken})
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

async function logout(req, res, next){
    try{
        const token = req.token
        await accessTokens.invalidatesJwtToken(token)
        res.status(204).send()
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export {createUser, login, userByEmail, logout}