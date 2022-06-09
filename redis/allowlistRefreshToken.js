import redis from 'redis';

const allowListRefreshToken = redis.createClient({prefix: 'allowListRefreshToken:'});
await allowListRefreshToken.connect()

async function add(token, value, expirationDate){
    await allowListRefreshToken.set(token, value)
    allowListRefreshToken.expire(token, expirationDate)
}

async function getValue(token){
    return allowListRefreshToken.get(token)
}

async function deleteAsync(token){
    await allowListRefreshToken.del(token)
}

export {add, getValue, deleteAsync}



