import express from 'express';
import recipes from './recipesRoutes.js';
import expenditures from './expendituresRoutes.js';
import resume from './resumeRoutes.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: 'Welcome to the Recipes API'});
    })
    app.use(express.json(), recipes, expenditures, resume)
}

export default routes;