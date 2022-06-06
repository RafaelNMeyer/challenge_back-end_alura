import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import moment from 'moment'
import * as allowListRefreshToken from '../../redis/allowListRefreshToken.js'
import TokenError from '../errors/TokenError.js'

const expiration = {time: 5, unit: 'd'}

async function createRefreshToken(id){
    const refreshToken = crypto.randomBytes(24).toString('hex')
    const expirationDate = moment().add(expiration.time, expiration.unit).unix()
    await allowListRefreshToken.add(refreshToken, id, expirationDate)
    return refreshToken
}

async function verifyRefreshToken(token){
    const id = await allowListRefreshToken.getValue(token)
    if(!id) throw new TokenError('Invalid refresh token', 400)
    return id
}

async function invalidatesRefreshToken(token){
    await allowListRefreshToken.deleteAsync(token)
}

export {createRefreshToken, verifyRefreshToken, invalidatesRefreshToken}

