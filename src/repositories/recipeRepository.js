import connection from '../database.js';

async function insertRecipe(recipe){
    const {description, value, date} = recipe
    const result = await connection.query(`
        INSERT INTO recipes (description, value, date)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [description, value, date])
    return result.rows[0]
}

async function listByDate(year, month){
    if(month){
        const results = await connection.query(`
            SELECT * FROM recipes
            WHERE (EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2)
        `,[year, month])
        return results.rows
    }
    const results = await connection.query(`
        SELECT * FROM recipes
        WHERE EXTRACT(YEAR FROM date) = $1
    `,[year])
    return results.rows
}

async function listRecipes(description){
    if(description){
        const result = await connection.query(`
            SELECT * FROM recipes 
            WHERE description = $1
        `, [description])
    return result.rows
    }
    const result = await connection.query(`
        SELECT * FROM recipes 
    `)
    return result.rows
}

async function listRecipe(id){
    const result = await connection.query(`
        SELECT * FROM recipes
        WHERE id = $1
    `, [id])
    return result.rows[0]
}

async function updateRecipe(id, recipe){
    const {description, value, date} = recipe
    const result = await connection.query(`
        UPDATE recipes
        SET description = $2, value = $3, date = $4
        WHERE id = $1
        RETURNING *
    `, [id, description, value, date])
    return result.rows[0]
}

async function deleteRecipe(id){
    const result = await connection.query(`
        DELETE FROM recipes
        WHERE id = $1
        RETURNING *
    `, [id])
    return result.rows[0]
}

export {insertRecipe, listRecipes, listRecipe, updateRecipe, deleteRecipe, listByDate};