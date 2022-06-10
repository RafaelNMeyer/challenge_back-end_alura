import redis from "redis";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";


let socket = {}
if(process.env.NODE_ENV === 'prod'){
  socket = {
    tls: true,
    rejectUnauthorized: false,
  }
}

const blocklistAcessToken = redis.createClient({
  prefix: "blocklistAcessToken:",
  url: process.env.REDIS_TLS_URL,
  socket
});
await blocklistAcessToken.connect();

function createHashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function add(token) {
  const expirationDate = jwt.decode(token).exp;
  const hashToken = createHashToken(token);
  await blocklistAcessToken.set(hashToken, "");
  blocklistAcessToken.expire(hashToken, expirationDate);
}

async function exists(token) {
  const hashToken = createHashToken(token);
  const result = await blocklistAcessToken.exists(hashToken);
  return result === 1;
}

export { add, exists };
