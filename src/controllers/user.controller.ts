import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()


export class UserController {

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get All Users  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/users  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
	async getAllUsers (req: Request, res: Response) {
		const users = await prisma.user.findMany()

		return res.status(200).json(users)
	}

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get User by ID  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/user/:uuid  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
	async getUserByUuid (req: Request, res: Response) {
		const uuid = req.params.uuid,
			user = await prisma.user.findUnique({
				where: {
					uuid: uuid
				}
			})

		if (!user) {
			res.status(404).json(`No user with corresponding uuid : '${uuid}' was found.`)
		} else {
			res.status(200).json(user)
		}
	}

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Update User  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/user/:uuid  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
	async updateUser (req: Request, res: Response) {
		const { firstName, lastName, email, password, isAdmin } = req.body,
				uuid = req.params.uuid
		
				
		if (firstName !== null && lastName !== null && email !== null && password !== null && isAdmin !== null) {
			bcrypt.hash(password, 12, async function (err, hash) {
				try {
					const user = await prisma.user.update({
						where: {
							uuid: uuid
						},
						data: {
							firstName: firstName,
							lastName: lastName,
							email: email,
							password: hash,
							isAdmin: isAdmin || false
						}
					})
					res.status(200).json(user)
					
				} catch (err) { 
					res.status(404).json(`No user with corresponding uuid : '${uuid}' was found.`)
				}
			})
			
		} else {
			res.status(400).json('All fields must be provided to update user.')
		}

		
			
	}
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Delete User  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/user/:uuid  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
	async deleteUser (req: Request, res: Response) {
		try {
			const uuid = req.params.uuid,
					user = await prisma.user.delete({
						where: { 
							uuid: uuid
						}
					})

			res.status(204).json()
		} catch (err) {
			res.status(404).json(err)
		}
		
	}
}

export default new UserController()
