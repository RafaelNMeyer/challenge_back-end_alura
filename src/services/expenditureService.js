import * as expenditureRepository from '../repositories/expenditureRepository.js'
import ExpenditureError from '../errors/ExpenditureError.js'

const categorys = ['food', 'health', 'home', 'transport', 'education', 'leisure', 'unforeseen']

async function listExpenditures(description){
    const result = await expenditureRepository.listExpenditures(description);
    return result
}

async function listByDate(year, month){
    const result = await expenditureRepository.listByDate(year, month)
    if(!result) throw new ExpenditureError('Expenditure not found', 404)
    return result
}

async function listExpenditure(id){
    const result = await expenditureRepository.listExpenditure(id);
    if(!result) throw new ExpenditureError("Expenditure not found", 404)
    return result
}

async function expenditureInMonth(expenditure){
    const {description, date, id} = expenditure
    const dateObj = new Date(date)

    const expenditures = await expenditureRepository.listExpenditures()

    const expenditureInMonth = expenditures.filter(expenditureIter => {
        const expenditureDate = new Date(expenditureIter.date)
        return (expenditureIter.description === description && expenditureDate.getMonth() === dateObj.getMonth() && id !== expenditureIter.id)
    })
    if(expenditureInMonth.length > 0){
        throw new ExpenditureError('Expenditure with same description already exists', 409)
    } 
}

function validateCategory(category){
    const containsCategory = categorys.includes(category)
    {!containsCategory ? category = 'others' : null}
    return category
}

async function insertExpenditure(expenditure){
    expenditure.category = validateCategory(expenditure.category)
    await expenditureInMonth(expenditure)
    const result = await expenditureRepository.insertExpenditure(expenditure);
    return result
}

async function updateExpenditure(id, expenditureBody){
    const {description, value, date, category} = expenditureBody
    const expenditure = await listExpenditure(id)
    {description ?  expenditure.description = description : null} 
    {value ?  expenditure.value = value : null} 
    {date ?  expenditure.date = date : null} 
    {category ?  expenditure.category = validateCategory(category) : expenditure.category = 'others'} 
    
    await expenditureInMonth(expenditure);
    const result = await expenditureRepository.updateExpenditure(id, expenditure);
    return result
}

async function deleteExpenditure(id){
    const result = await expenditureRepository.deleteExpenditure(id)
    if(!result) throw new ExpenditureError('Expenditure not found', 404)
    return result
}

export {listExpenditures, insertExpenditure, listExpenditure, updateExpenditure, deleteExpenditure, listByDate}