import passport from "./strategies.js";
import * as refreshTokens from '../tokens/refreshToken.js'
import * as userService from '../services/userService.js'

async function local(req, res, next) {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error) return res.status(500).send(error.message);
    if (!user) return res.status(401).send();
    req.user = user;
    return next();
  })(req, res, next);
}

async function bearer(req, res, next) {
  passport.authenticate("bearer", { session: false }, (error, user, info) => {
    if (error && error.name === "JsonWebTokenError") {
      return res.status(401).send(error.message);
    }
    if (error && error.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ error: error.message, expiredAt: error.expiredAt });
    }
    if (error) return res.status(500).send(error.message);

    if (!user) return res.status(401).send();

    req.token = info.token;
    req.user = user;
    return next();
  })(req, res, next);
  passport;
}

async function refresh(req, res, next){
    try{
        const {refreshToken} = req.body
        const id = await refreshTokens.verifyRefreshToken(refreshToken)
        await refreshTokens.invalidatesRefreshToken(refreshToken)
        req.user = await userService.userById(id)
        return next()
    }catch(error){
        return res.status(error.status).send(error.message)
    }
}

export { bearer, local, refresh };