import { getAllUsers, getUserByUuid } from '../user.controller'
import { prismaMock } from './../singleton'
import request from 'supertest'
import app from '../../main'

const token = process.env.TOKEN,
    badToken = 'A mistake obviously.',
    badUuid = '00000000-0000-0000-0000-00000000000',
    exampleUuid = '1995e5c4-0ba3-486a-a153-5ed175b9986d',
    expectedResult = [
        {
            'firstName': 'Jane',
            'lastName': 'Dere',
            'email': 'jane@dere.com',
            'password': '$2b$12$tGC7Aih9YXKvLz5uzqdGkOvYwCH9sclEOm/kvJMmaf14xjknicuHW',
            'isAdmin': false,
            'uuid': '1995e5c4-0ba3-486a-a153-5ed175b9986d'
        },
        {
            'firstName': 'Dude',
            'lastName': 'Joey',
            'email': 'theDude@gmail.com',
            'password': '$2b$12$sEMZ4hNLXjvVDCZxZgkPLeKEpQPaXJqaOPaIS0xr4L5gjQB2iCqWG',
            'isAdmin': false,
            'uuid': '2344fa65-a728-4be1-9d52-51e15e584b0b'
        },
        {
            'firstName': 'Pork',
            'lastName': 'Ham',
            'email': 'proky@gmail.com',
            'password': '$2b$12$CpymDUcT9G9tLqFFulJTKOW0EaCfrrw46NN7.6gxgU0Jy/akvCh22',
            'isAdmin': true,
            'uuid': '73c4b804-a598-421a-a56e-0ab23ff22505'
        },
        {
            'firstName': 'Tim',
            'lastName': 'Jons',
            'email': 'tim.jons@outlook.com',
            'password': 'timjons',
            'isAdmin': false,
            'uuid': '7acf31ec-0606-4b55-9d88-1086a2eb45e1'
        },
        {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@hotmail.com',
            'password': '$2b$12$REqvtVd8CYoUjU.ibQCDvO3SqTu4NRZ6PmEsr72MUnO2rcFmqfmy6',
            'isAdmin': false,
            'uuid': '987844de-4842-4069-969e-1f4481ecc1ac'
        },
        {
            'firstName': 'Jane',
            'lastName': 'Isdere',
            'email': 'jane@isDere.com',
            'password': '$2b$12$wMYgIxu2eqNrZcUDBuL.Ke2T6AmhESEQbh2Szf2pkYPX2OfrYj7vC',
            'isAdmin': false,
            'uuid': 'a067fc81-1208-487f-b0cd-6df13d7185ce'
        },
        {
            'firstName': 'Joe',
            'lastName': 'Dalton',
            'email': 'joe.dalton@outlook.com',
            'password': '$2b$12$aABYxWVJdzxmRHIOmzRRSOLAUsEbqNCQlDFz91cFowtdqzGsDXZbS',
            'isAdmin': false,
            'uuid': 'e29a1dea-40f0-4c66-90d9-510e16d8449d'
        }
    ],
    userExample = {
        'firstName': 'Jane',
        'lastName': 'Dere',
        'email': 'jane@dere.com',
        'password': '$2b$12$tGC7Aih9YXKvLz5uzqdGkOvYwCH9sclEOm/kvJMmaf14xjknicuHW',
        'isAdmin': false,
        'uuid': '1995e5c4-0ba3-486a-a153-5ed175b9986d'
    },
    badUserExample = {
        'firstName': '',
        'lastName': '',
        'email': 'jane@dere.com',
        'password': '$2b$12$tGC7Aih9YXKvLz5uzqdGkOvYwCH9sclEOm/kvJMmaf14xjknicuHW',
        'isAdmin': false,
        'uuid': '1995e5c4-0ba3-486a-a153-5ed175b9986d'
    }

describe('getAllUsers', () => {
    it('should give a list of all users in database', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(expectedResult)
    })

    it('should return an error if the token is wrong', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${badToken}`)
        
        expect(res.statusCode).toEqual(403)
        expect(res.body).toEqual({
            'success': false,
            'message': 'Token expired'
        })
    })
})

describe('getUserByUuid', () => {
    it('should return the user designated by uuid parameter', async () => {
        const res = await request(app)
            .get(`/user/${exampleUuid}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(userExample)
    })

    it('should return an error if a bad uuid is given', async () => {
        const res = await request(app)
            .get(`/user/${badUuid}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(404)
        expect(res.body).toEqual(`No user with corresponding uuid : '${badUuid}' was found.`)
    })

    it('should return an error if the token is wrong', async () => {
        const res = await request(app)
            .get('/user/1995e5c4-0ba3-486a-a153-5ed175b9986d')
            .set('Authorization', `Bearer ${badToken}`)

        expect(res.statusCode).toEqual(403)
        expect(res.body).toEqual({
            'success': false,
            'message': 'Token expired'
        })
    })
})

describe('updateUser', () => {
    it('should update the user designated by uuid parameter', async () => {
        const res = await request(app)
            .put(`/user/${exampleUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(userExample)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(userExample)
    })

    it('should return an error if the token is wrong', async () => {
        const res = await request(app)
            .put(`/user/${exampleUuid}`)
            .set('Authorization', `Bearer ${badToken}`)
            .send(userExample)
        
        expect(res.statusCode).toEqual(403)
        expect(res.body).toEqual({
            'success': false,
            'message': 'Token expired'
        })
    })

    it('should return an error if a bad uuid is given', async () => {
        const res = await request(app)
            .put(`/user/${badUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(userExample)
        
        expect(res.statusCode).toEqual(404)
        expect(res.body).toEqual(`No user with corresponding uuid : '${badUuid}' was found.`)
    })

    it('should return an error if an input is poorly filled', async () => {
        const res = await request(app)
            .put(`/user/${exampleUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(badUserExample)
        
        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual('All fields must be provided to update user.')
    })
})
