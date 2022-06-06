import passport from 'passport'
import passportLocal from 'passport-local'
import passportBearer from 'passport-http-bearer'
import * as accessToken from '../tokens/accessToken.js'
import * as userService from '../services/userService.js'

const LocalStrategy = passportLocal.Strategy
const BearerStrategy = passportBearer.Strategy

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        async (email, password, done) => {
            try{
                const user = await userService.userByEmail(email)
                done(null, user)
            }catch(error){
                done(error)
            }
        }
    )
)

passport.use(
    new BearerStrategy(async (token, done) => {
        try{
            const id = await accessToken.verifyJwtToken(token)
            const user = await userService.userById(id)
            done(null, user, {token})
        }catch(error){
            done(error)
        }
    })
)

export default passport