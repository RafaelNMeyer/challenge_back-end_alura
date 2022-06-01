import * as expenditureService from './expenditureService.js'
import * as recipeService from './recipeService.js'

function assembleValues(values){
    let sum = 0
    const resumeCategory = {}
    for (let i = 0; i < values.length; i++) {
        const {value} = values[i]
        sum+=values[i].value
    }
    return sum
}

function resumeExpenditureCategory(expenditures){
    let resumeCategory = {}
    for (let i = 0; i < expenditures.length; i++) {
        let {value, category} = expenditures[i]
        if(resumeCategory[category]){
            resumeCategory[category] += value
        }
        else{
            resumeCategory[category] = value
        }   
    }
    return resumeCategory
}

async function resume(year, month){
    const recipesMonth = await recipeService.listByDate(year, month)
    const expendituresMonth = await expenditureService.listByDate(year, month)
    const totalRecipes = assembleValues(recipesMonth)
    const totalExpenditures = assembleValues(expendituresMonth)
    const resumeCategory = resumeExpenditureCategory(expendituresMonth)
    const totalBalance = totalRecipes - totalExpenditures
    const resume = {
        totalRecipes:totalRecipes,
        totalExpenditures:totalExpenditures,
        totalBalance:totalBalance,
        expenditures: resumeCategory
    }
    return resume
}

export {resume}