import express from 'express';
import recipts from './reciptsRoutes.js';
import expenditures from './expendituresRoutes.js';
import resume from './resumeRoutes.js'
import users from './usersRoutes.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: 'Welcome to the recipts API'});
    })
    app.use(express.json(), recipts, expenditures, resume, users)
}

export default routes;