import * as reciptService from '../services/reciptService.js'

async function insertrecipt(req, res, next){
    try{
        const result = await reciptService.insertrecipt(req.body);
        return res.status(201).send(result)
    } catch(error){
        if (error.name === 'ReciptError') return res.status(error.status).send({error: error.message});
        return next(error)
    }
}

async function listByDate(req, res, next){
    const {year, month} = req.params
    try{
        const result = await reciptService.listByDate(year, month)
        return res.status(200).send(result)
    }catch(error){
        if(error.name === 'ReciptError') return res.status(error.status).send({error: error.message})
        return next(error)
    }
}

async function listrecipts(req, res, next){
    try{
        const {description} = req.query
        const result = await reciptService.listrecipts(description);
        return res.status(200).send(result)
    } catch(error){
        return next(error)
    }
}

async function listrecipt(req, res, next){
    try{
        const result = await reciptService.listrecipt(req.params.id);
        return res.status(200).send(result)
    } catch(error){
        if (error.name === 'ReciptError') return res.status(error.status).send({error: error.message});
        return next(error)
    }
}

async function updaterecipt(req, res, next){
    try{
        const result = await reciptService.updaterecipt(req.params.id, req.body);
        return res.status(200).send(result)
    } catch(error){
        if (error.name === 'ReciptError') return res.status(error.status).send({error: error.message});
        return next(error)
    }
}

async function deleterecipt(req, res, next){
    try{
        const result = await reciptService.deleterecipt(req.params.id);
        return res.status(200).send(result)
    } catch(error){
        if (error.name === 'ReciptError') return res.status(error.status).send({error: error.message});
        return next(error)
    }
}

export {insertrecipt, listrecipts, listrecipt, updaterecipt, deleterecipt, listByDate}