import * as expenditureService from '../services/expenditureService.js'

async function insertExpenditure(req, res, next){
    try{
        const result = await expenditureService.insertExpenditure(req.body);
        return res.status(201).send(result)
    } catch(error){
        if (error.name === 'ExpenditureError') return res.status(error.status).send(error.message);
        return next(error)
    }
}

async function listExpenditures(req, res, next){
    try{
        const result = await expenditureService.listExpenditures()
        return res.status(200).send(result)
    }catch(error){
        return next(error)
    }
}

async function listExpenditure(req, res, next){
    try{
        const result = await expenditureService.listExpenditure(req.params.id)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'ExpenditureError') return res.status(error.status).send(error.message)
        return next(error)
    }
}

async function updateExpenditure(req, res, next){
    try{
        const result = await expenditureService.updateExpenditure(req.params.id, req.body)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'ExpenditureError') return res.status(error.status).send(error.message)
        return next(error)
    }
}

async function deleteExpenditure(req, res, next){
    try{
        const result = await expenditureService.deleteExpenditure(req.params.id)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'ExpenditureError') return res.status(error.status).send(error.message)
        return next(error)
    }
}

export {listExpenditures, insertExpenditure, listExpenditure, updateExpenditure, deleteExpenditure}