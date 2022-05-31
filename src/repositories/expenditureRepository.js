import connection from '../database.js'

async function listExpenditures(description){
    if(description){
        const result = await connection.query(`
        SELECT * FROM expenditures 
        WHERE description = $1
    `, [description])
    return result.rows
    }
    const result = await connection.query(`
        SELECT * FROM expenditures 
    `)
    return result.rows
}

async function listByDate(year, month){
    if(month){
        const results = await connection.query(`
            SELECT * FROM expenditures
            WHERE (EXTRACT(YEAR FROM date) = $1 AND EXTRACT(month FROM date) = $2)
        `, [year, month])
        return results.rows
    }
    const result = await connection.query(`
        SELECT * FROM expenditures
        WHERE EXTRACT(YEAR FROM date) = $1
    `, [year])
    return results.rows
}

async function listExpenditure(id){
    const result = await connection.query(`
        SELECT * FROM expenditures
        WHERE id = $1
    `, [id])
    return result.rows[0]
}

async function updateExpenditure(id, expenditure){
    const {description, value, date, category} = expenditure
    const result = await connection.query(`
        UPDATE expenditures
        SET description = $2, value = $3, date = $4, category = $5
        WHERE id = $1
        RETURNING *
    `,[id, description, value, date, category])
    return result.rows[0]
}

async function insertExpenditure(expenditure){
    const {description, value, date, category} = expenditure
    const results = await connection.query(`
        INSERT INTO expenditures (description, value, date, category)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `,[description, value, date, category])
    return results.rows[0]
}

async function deleteExpenditure(id){
    const result = await connection.query(`
        DELETE FROM expenditures
        WHERE id = $1
        RETURNING *
    `,[id])
    return result.rows[0]
}

export {listExpenditures, insertExpenditure, listExpenditure, updateExpenditure, deleteExpenditure, listByDate}