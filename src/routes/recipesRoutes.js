    import express from 'express'
import * as recipesController from '../controllers/recipesController.js'
import * as authentication from '../middlewares/authentication.js'

const router = express.Router()

router
    .post('/recipes', authentication.bearer, recipesController.insertRecipe)
    .get('/recipes', authentication.bearer, recipesController.listRecipes)
    .get('/recipes?description=', authentication.bearer, recipesController.listRecipe)
    .get('/recipes/:id', authentication.bearer, recipesController.listRecipe)
    .get('/recipes/:year/:month', authentication.bearer, recipesController.listByDate)
    .put('/recipes/:id', authentication.bearer, recipesController.updateRecipe)
    .delete('/recipes/:id', authentication.bearer, recipesController.deleteRecipe)

export default router;