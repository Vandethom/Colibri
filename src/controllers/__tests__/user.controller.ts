import request from 'supertest'
import app from '../../main'

const expectedResult = [
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
        'password': '$2b$12$VziAGE/3lHd0/zULZAF0hekkXTVhKMWuG.BfstbPEK2Sg6S6IeABm',
        'isAdmin': true,
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
    }
]

describe('UserController', () => {
    it('should give a list of all users in database', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6IlRpbSIsImxhc3ROYW1lIjoiSm9ucyIsImVtYWlsIjoidGltLmpvbnNAb3V0bG9vay5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiRWemlBR0UvM2xIZDAvelVMWkFGMGhla2tYVFZoS01XdUcuQmZzdGJQRUsyU2c2UzZJZUFCbSIsImlzQWRtaW4iOnRydWUsInV1aWQiOiI3YWNmMzFlYy0wNjA2LTRiNTUtOWQ4OC0xMDg2YTJlYjQ1ZTEifSwiaWF0IjoxNjUxNzQwMDQ1LCJleHAiOjE2NTE3NDM2NDV9.i-GlgwOJ7VMYaGH-r9-D3M7WXyU22_q-BvLkjWHmav8`)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(expectedResult)
    })
    

})
