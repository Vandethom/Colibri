import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient(),
    token = process.env.SECRET_TOKEN as string

class AuthController {
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Log-in  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/login  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async login(req: Request, res: Response) {
        const { email, password } = req.body,
            user = await prisma.user.findUnique({
                where: { email: email }
            })

        if (!user) {
            res.status(400).json('Bad inputs or user doesn\'t exist.')
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    res.status(200).json({
                        user: user,
                        token: jwt.sign(
                            { user },
                            token,
                            { expiresIn: '1h' }
                        )
                    })
                } else {
                    res.status(401).json({ error: 'Mot de passe incorrect.'})
                }
            }
        )}	
    }
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Sign up  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/signup  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async signup(req: Request, res: Response) {
        const { firstName, lastName, email, password, isAdmin } = req.body

        bcrypt.hash(password, 12, async function (err, hash) {
            const user = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    isAdmin: isAdmin || false
                }
            })

            res.json(user)
        })
    }
}

export default new AuthController()
