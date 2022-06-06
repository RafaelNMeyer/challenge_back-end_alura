import redis from 'redis';
import { promisify } from 'util';

const allowListRefreshToken = redis.createClient({prefix: 'allowListRefreshToken:'});

await allowListRefreshToken.connect()

async function add(token, value, expirationDate){
    await allowListRefreshToken.set(token, value)
    allowListRefreshToken.expireat(token, expirationDate)
}

async function getValue(token){
    return allowListRefreshToken.get(token)
}

async function deleteAsync(token){
    await allowListRefreshToken.del(token)
}

export {add, getValue, deleteAsync}




