import * as userRepository from '../repositories/userRepository.js'
import UserError from '../errors/UserError.js'
import bcrypt from 'bcrypt';

async function createUser(user){
    const {name, email, password} = user

    const emailExists = await userRepository.searchByEmail(email)
    if(emailExists) throw new UserError('Email already exists!', 409)

    const hashedPass = bcrypt.hashSync(password, 10)
    const body = {name, email, password: hashedPass}

    const result = await userRepository.createUser(body)
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

async function checkLogin(email, password){
    const result = await userRepository.searchByEmail(email)
    if(result && bcrypt.compareSync(password, result.password)) return result
    throw new UserError('Email or Password invalids', 401)
}

export {createUser, userByEmail, userById, checkLogin}