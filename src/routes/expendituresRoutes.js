import express from 'express'
import * as expendituresController from '../controllers/expendituresController.js'
import * as authentication from '../middlewares/authentication.js'

const router = express.Router()

router
    .post('/expenditures', authentication.bearer, expendituresController.insertExpenditure)
    .get('/expenditures', authentication.bearer, expendituresController.listExpenditures)
    .get('/expenditures/?description=', authentication.bearer, expendituresController.listExpenditures)
    .get('/expenditures/:year/:month', authentication.bearer, expendituresController.listByDate)
    .get('/expenditures/:id', authentication.bearer, expendituresController.listExpenditure)
    .put('/expenditures/:id', authentication.bearer, expendituresController.updateExpenditure)
    .delete('/expenditures/:id', authentication.bearer, expendituresController.deleteExpenditure)

export default router;
