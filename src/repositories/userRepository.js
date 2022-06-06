import connection from '../database.js'

async function createUser(user){
    const {name, email, password} = user
    const result = await connection.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [name, email, password])
    return result.rows[0]
}

async function searchByEmail(email){
    const result = await connection.query(`
        SELECT * FROM users
        WHERE email = $1
    `, [email])
    return result.rows[0]
}

async function searchById(id){
    const result = await connection.query(`
        SELECT * FROM users
        where id = $1
    `, [id])
    return result.rows[0]
}

export {createUser, searchByEmail, searchById}