import * as reciptRepository from '../repositories/reciptRepository.js';
import ReciptError from '../errors/ReciptError.js'

async function listrecipts(description){
    const result = await reciptRepository.listrecipts(description);
    return result
}

async function listByDate(year, month){
    const result = await reciptRepository.listByDate(year, month);
    if(!result) throw new ReciptError('recipt not found', 404)
    return result
}

async function reciptInMonth(recipt){
    const {description, value, date, id} = recipt
    const dateObj = new Date(date)

    const recipts = await reciptRepository.listrecipts()

    const reciptInMonth = recipts.filter(reciptIter => {
        const reciptDate = new Date(reciptIter.date)
        return (reciptIter.description === description && reciptDate.getMonth() === dateObj.getMonth() && id !== reciptIter.id)
    })
    if(reciptInMonth.length > 0){
        throw new ReciptError('recipt with same description already exists', 409)
    } 
}

async function insertrecipt(recipt){
    await reciptInMonth(recipt)
    const result = await reciptRepository.insertrecipt(recipt);
    return result
}

async function listrecipt(id){
    const result = await reciptRepository.listrecipt(id)
    if(!result) throw new ReciptError('recipt not found', 404)
    return result
}

async function updaterecipt(id, reciptFromBody){
    const recipt = await listrecipt(id)
    if(!recipt) throw new ReciptError('recipt not found', 404)
    if(reciptFromBody.description) recipt.description = reciptFromBody.description
    if(reciptFromBody.value) recipt.value = reciptFromBody.value
    if(reciptFromBody.date) recipt.date = reciptFromBody.date
    await reciptInMonth(recipt)
    const result = await reciptRepository.updaterecipt(id, recipt)
    return result
}

async function deleterecipt(id){
    const recipt = await listrecipt(id)
    if(!recipt) throw new ReciptError('recipt not found', 404)
    const result = await reciptRepository.deleterecipt(id)
    return result
}

export {insertrecipt, listrecipts, listrecipt, updaterecipt, deleterecipt, listByDate}