import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import moment from 'moment'
import * as blocklistAccessToken from '../../redis/blocklistAcessToken.js'

const expiration = {time: 15, unit: 'm'}

function createJwtToken(id){
    const payload = {id}
    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: expiration.time+expiration.unit})
    return token
}

async function verifyJwtToken(token){
    const accessToken = await blocklistAccessToken.exists(token)
    if(accessToken) throw new jwt.JsonWebTokenError('Access token invalid.')

    const {id} = jwt.verify(token, process.env.JWT_KEY);
    return id;
}

function invalidatesJwtToken(token){
    return blocklistAccessToken.add(token)
}

export {createJwtToken, verifyJwtToken, invalidatesJwtToken}