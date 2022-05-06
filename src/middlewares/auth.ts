import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const TOKEN = process.env.SECRET_TOKEN as string

class JWT {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization

        if (authHeader && authHeader !== null) {
            const token = authHeader.split(' ')[1] // We only need the payload part of the token to verify
            jwt.verify(token, TOKEN, (err, user) => {
                if (err) {
                    res.status(403).json({ success: false, message: 'Token expired'})
                } else {
                    req.body.user = user
                    next()
                }
            })
        } else {
            res.status(403).json({ success: false, message: 'Unauthorized'})
        }
    }
}

export default new JWT()
