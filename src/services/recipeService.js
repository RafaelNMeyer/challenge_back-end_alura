import * as recipeRepository from '../repositories/recipeRepository.js';
import RecipeError from '../errors/RecipeError.js'

async function listRecipes(description){
    const result = await recipeRepository.listRecipes(description);
    return result
}

async function listByDate(year, month){
    const result = await recipeRepository.listByDate(year, month);
    if(!result) throw new RecipeError('Recipe not found', 404)
    return result
}

async function recipeInMonth(recipe){
    const {description, value, date, id} = recipe
    const dateObj = new Date(date)

    const recipes = await recipeRepository.listRecipes()

    const recipeInMonth = recipes.filter(recipeIter => {
        const recipeDate = new Date(recipeIter.date)
        return (recipeIter.description === description && recipeDate.getMonth() === dateObj.getMonth() && id !== recipeIter.id)
    })
    if(recipeInMonth.length > 0){
        throw new RecipeError('Recipe with same description already exists', 409)
    } 
}

async function insertRecipe(recipe){
    await recipeInMonth(recipe)
    const result = await recipeRepository.insertRecipe(recipe);
    return result
}

async function listRecipe(id){
    const result = await recipeRepository.listRecipe(id)
    if(!result) throw new RecipeError('Recipe not found', 404)
    return result
}

async function updateRecipe(id, recipeFromBody){
    const recipe = await listRecipe(id)
    if(!recipe) throw new RecipeError('Recipe not found', 404)
    if(recipeFromBody.description) recipe.description = recipeFromBody.description
    if(recipeFromBody.value) recipe.value = recipeFromBody.value
    if(recipeFromBody.date) recipe.date = recipeFromBody.date
    await recipeInMonth(recipe)
    const result = await recipeRepository.updateRecipe(id, recipe)
    return result
}

async function deleteRecipe(id){
    const recipe = await listRecipe(id)
    if(!recipe) throw new RecipeError('Recipe not found', 404)
    const result = await recipeRepository.deleteRecipe(id)
    return result
}

export {insertRecipe, listRecipes, listRecipe, updateRecipe, deleteRecipe, listByDate}