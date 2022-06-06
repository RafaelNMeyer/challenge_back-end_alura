import * as userRepository from '../repositories/userRepository.js'
import UserError from '../errors/UserError.js'

async function createUser(user){
    const result = await userRepository.createUser(user)
    if(!result) throw new UserError('Error to create user', 409)
    return result
}

async function userByEmail(email){
    const result = await userRepository.searchByEmail(email)
    if(!result) throw new UserError('User not found', 409)
    return result
}

async function userById(id){
    const result = await userRepository.searchById(id)
    if(!result) throw new UserError('User not found', 409)
    return result
}

export {createUser, userByEmail, userById}