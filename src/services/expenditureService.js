import * as expenditureRepository from '../repositories/expenditureRepository.js'
import ExpenditureError from '../errors/ExpenditureError.js'

const categorys = ['food', 'health', 'home', 'transport', 'education', 'leisure', 'unforeseen']

async function listExpenditures(){
    const result = await expenditureRepository.listExpenditures();
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

async function insertExpenditure(expenditure){
    const containsCategory = categorys.find(expenditure.category)
    {!containsCategory ? expenditure.category = 'others' : null}
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
    {category ?  expenditure.category = category : expenditure.category = 'others'} 
    
    await expenditureInMonth(expenditure);
    const result = await expenditureRepository.updateExpenditure(id, expenditure);
    return result
}

async function deleteExpenditure(id){
    const result = await expenditureRepository.deleteExpenditure(id)
    if(!result) throw new ExpenditureError('Expenditure not found', 404)
    return result
}

export {listExpenditures, insertExpenditure, listExpenditure, updateExpenditure, deleteExpenditure}