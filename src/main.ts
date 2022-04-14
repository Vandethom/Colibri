import express, { Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

// Boot express
const app: Application = express()
const prisma = new PrismaClient()
const port = 3000

app.use(express.json())


app.post('/', async (req: Request, res: Response) => {
	const {username, password} = req.body,
		user = await prisma.user.create({
			data: {
				username: username,
				password: password
			}
		})
	
	res.json(user)
})

app.get('/', async (req: Request, res: Response) => {
	const users = await prisma.user.findMany()

	res.json(users)
})

app.put('/', async (req: Request, res: Response) => {
	const { id, username } = req.body,
		updatedUser = await prisma.user.update({
			where: {
				id: id
			},
			data: {
				username: username
			}
		})
	
	res.json(updatedUser)
})

app.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id,
		deletedUser = await prisma.user.delete({
			where: {
				id: Number(id)
			}
		})

	res.json(deletedUser)
})

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))
