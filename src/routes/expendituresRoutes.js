import express from 'express'
import * as expendituresController from '../controllers/expendituresController.js'

const router = express.Router()

router
    .post('/expenditures', expendituresController.insertExpenditure)
    .get('/expenditures', expendituresController.listExpenditures)
    .get('/expenditures/:id', expendituresController.listExpenditure)
    .put('/expenditures/:id', expendituresController.updateExpenditure)
    .delete('/expenditures/:id', expendituresController.deleteExpenditure)

export default router;
