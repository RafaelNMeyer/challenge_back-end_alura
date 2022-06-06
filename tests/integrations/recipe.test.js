import '../../src/setup.js'
import app from '../../src/app.js'
import supertest from 'supertest'

import { endConnection, cleanDB } from '../utils/recipeHelpers.js'

afterAll(async () => {
    await cleanDB()
    await endConnection()
})

const body = {
    description: "salario",
    value: 1675,
    date: "2022-05-30T03:00:00.000Z"
}

describe('POST /recipes', () => {
    beforeEach(async () => {
        await cleanDB();
    });

    it('returns 201 for created recipe with valid body', async () => {

        const result = await supertest(app)
            .post('/recipes')
            .send(body);
        expect(result.status).toEqual(201);
    });
})