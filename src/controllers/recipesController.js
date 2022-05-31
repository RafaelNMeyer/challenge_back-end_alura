import * as recipeService from '../services/recipeService.js'

async function insertRecipe(req, res, next){
    try{
        const result = await recipeService.insertRecipe(req.body);
        return res.status(201).send(result)
    } catch(error){
        if (error.name === 'RecipeError') return res.status(error.status).send(error.message);
        return next(error)
    }
}

async function listRecipes(req, res, next){
    try{
        const result = await recipeService.listRecipes();
        return res.status(200).send(result)
    } catch(error){
        return next(error)
    }
}

async function listRecipe(req, res, next){
    try{
        const result = await recipeService.listRecipe(req.params.id);
        return res.status(200).send(result)
    } catch(error){
        if (error.name === 'RecipeError') return res.status(error.status).send(error.message);
        return next(error)
    }
}

async function updateRecipe(req, res, next){
    try{
        const result = await recipeService.updateRecipe(req.params.id, req.body);
        return res.status(200).send(result)
    } catch(error){
        if (error.name === 'RecipeError') return res.status(error.status).send(error.message);
        return next(error)
    }
}

async function deleteRecipe(req, res, next){
    try{
        const result = await recipeService.deleteRecipe(req.params.id);
        return res.status(200).send(result)
    } catch(error){
        if (error.name === 'RecipeError') return res.status(error.status).send(error.message);
        return next(error)
    }
}

export {insertRecipe, listRecipes, listRecipe, updateRecipe, deleteRecipe}