import redis from 'redis';
import jwt from 'jsonwebtoken';
import {createHash} from 'crypto';

const redis_url = new URL(process.env.REDIS_URL)

const blocklistAcessToken = redis.createClient(redis_url.port, redis_url.hostname, {no_ready_check: true}, {prefix: 'blocklistAcessToken:'});
await blocklistAcessToken.connect()
if(redis.password)
  blocklistAcessToken.auth(redis_url.password)

function createHashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

async function add(token){
    const expirationDate = jwt.decode(token).exp
    const hashToken = createHashToken(token)
    await blocklistAcessToken.set(hashToken, '')
    blocklistAcessToken.expire(hashToken, expirationDate)
}

async function exists(token){
    const hashToken = createHashToken(token)
    const result = await blocklistAcessToken.exists(hashToken)
    return result === 1
}

export {add, exists}




