import * as resumeService from '../services/resumeService.js'

async function resume(req, res, next){
    const {year, month} = req.params
    try{
        const result = await resumeService.resume(year, month)
        return res.status(200).send(result)
    }catch(error){
        return next(error)
    }
}

export {resume}