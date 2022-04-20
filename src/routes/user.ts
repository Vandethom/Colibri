import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()
const router = express.Router()

router.get('/users', async (res: Response) => {
	const users = await prisma.user.findMany()
	res.json(users)
})

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Sign-in User  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

router.post('/user', (req: Request, res: Response) => {
	const { firstName, lastName, email, password } = req.body

	bcrypt.hash(password, 12, async function (err, hash) {
		const user = await prisma.user.create({
			data: {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: hash,
				isAdmin: false
			}
		})

		res.json(user)
	})
})

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Log-in User  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body,
		user = await prisma.user.findUnique({
			where: { email: email }
		})
	
	if (user) {
		bcrypt.compare(password, user.password, function (err, result) {
			if (result === true) {
				res.status(200).json({
					userId: user.uuid,
					token: jwt.sign(
						{ user },
						process.env.SECRET_TOKEN as string, {
							expiresIn: '1h'
						})
				})
			} else {
				res.status(401).json({ error: 'Mot de passe incorrect.'})
			}
		})
	}
})


export default router