import redis from 'redis';

const redis_url = new URL(process.env.REDIS_URL)

const allowListRefreshToken = redis.createClient({
    prefix: 'allowListRefreshToken:',
    url: process.env.REDIS_URL,
    socket:{
        tls:true,
        rejectUnauthorized: false
    }
});
await allowListRefreshToken.connect()

if(redis.password)
    allowListRefreshToken.auth(redis_url.password)

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




