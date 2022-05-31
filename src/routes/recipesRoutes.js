    import express from 'express'
import * as recipesController from '../controllers/recipesController.js'

const router = express.Router()

router
    .post('/recipes', recipesController.insertRecipe)
    .get('/recipes', recipesController.listRecipes)
    .get('/recipes?description=', recipesController.listRecipe)
    .get('/recipes/:id', recipesController.listRecipe)
    .get('/recipes/:year/:month', recipesController.listByDate)
    .put('/recipes/:id', recipesController.updateRecipe)
    .delete('/recipes/:id', recipesController.deleteRecipe)

export default router;