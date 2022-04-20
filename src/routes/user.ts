import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/users', async (res: Response) => {
	const users = await prisma.user.findMany()
	res.json(users)
})

router.post('/user', async (req: Request, res: Response) => {
	const { firstName, lastName, email, password } = req.body
	const user = await prisma.user.create({
		data: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			isAdmin: false
		}
	})

	res.json(user)
})

// router.get('/users', async (res: Response, next: NextFunction) => {
// 	prisma.user.create({
// 		firstName: 'John',
// 		lastName: 'Al',
// 		email: 'john@al.com',
// 		password: 'password'
// 	})
// })

// router.post('/user', async (req: Request, res: Response) => {
// 	const { firstName, lastName, email, password } = req.body,
// 		user = await prisma.user.create({
// 			data: {
// 				firstName: firstName,
// 				lastName: lastName,
// 				email: email,
// 				password: password
// 			}
// 		})

// 	res.json(user)
// })


export default router