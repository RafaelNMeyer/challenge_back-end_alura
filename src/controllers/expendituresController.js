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

async function listByDate(req, res, next){
    const {year, month} = req.params
    try{
        const result = await expenditureService.listByDate(year, month)
        return res.status(200).send(result)
    }catch(error){
        if (error.name === 'ExpenditureError') return res.status(error.status).send(error.message);
        return next(error)
    }
}

async function listExpenditures(req, res, next){
    const {description} = req.query
    try{
        const result = await expenditureService.listExpenditures(description)
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

export {listExpenditures, insertExpenditure, listExpenditure, updateExpenditure, deleteExpenditure, listByDate}