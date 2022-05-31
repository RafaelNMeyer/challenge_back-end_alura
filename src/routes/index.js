import express from 'express';
import recipes from './recipesRoutes.js';
import expenditures from './expendituresRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: 'Welcome to the Recipes API'});
    })
    app.use(express.json(), recipes, expenditures)
}

export default routes;