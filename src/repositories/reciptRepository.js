import connection from '../database.js';

async function insertrecipt(recipt){
    const {description, value, date} = recipt
    const result = await connection.query(`
        INSERT INTO recipts (description, value, date)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [description, value, date])
    return result.rows[0]
}

async function listByDate(year, month){
    if(month){
        const results = await connection.query(`
            SELECT * FROM recipts
            WHERE (EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2)
        `,[year, month])
        return results.rows
    }
    const results = await connection.query(`
        SELECT * FROM recipts
        WHERE EXTRACT(YEAR FROM date) = $1
    `,[year])
    return results.rows
}

async function listrecipts(description){
    if(description){
        const result = await connection.query(`
            SELECT * FROM recipts 
            WHERE description = $1
        `, [description])
    return result.rows
    }
    const result = await connection.query(`
        SELECT * FROM recipts 
    `)
    return result.rows
}

async function listrecipt(id){
    const result = await connection.query(`
        SELECT * FROM recipts
        WHERE id = $1
    `, [id])
    return result.rows[0]
}

async function updaterecipt(id, recipt){
    const {description, value, date} = recipt
    const result = await connection.query(`
        UPDATE recipts
        SET description = $2, value = $3, date = $4
        WHERE id = $1
        RETURNING *
    `, [id, description, value, date])
    return result.rows[0]
}

async function deleterecipt(id){
    const result = await connection.query(`
        DELETE FROM recipts
        WHERE id = $1
        RETURNING *
    `, [id])
    return result.rows[0]
}

export {insertrecipt, listrecipts, listrecipt, updaterecipt, deleterecipt, listByDate};