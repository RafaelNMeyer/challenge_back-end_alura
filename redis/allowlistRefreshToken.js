import redis from 'redis';

let socket = {}
if(process.env.NODE_ENV === 'prod'){
  socket = {
    tls: true,
    rejectUnauthorized: false,
  }
}

const allowListRefreshToken = redis.createClient({
    prefix: 'allowListRefreshToken:',
    url: process.env.REDIS_TLS_URL,
    socket
});
await allowListRefreshToken.connect()

async function add(token, value, expirationDate){
    await allowListRefreshToken.set(token, value)
    await allowListRefreshToken.expire(token, expirationDate)
}

async function getValue(token){
    return allowListRefreshToken.get(token)
}

async function deleteAsync(token){
    await allowListRefreshToken.del(token)
}

export {add, getValue, deleteAsync}




