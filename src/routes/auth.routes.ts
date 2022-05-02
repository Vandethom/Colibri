import { Application } from 'express'
import { RoutesConfig } from './routesConfig'
import AuthController from '../controllers/auth.controller'
import JWT from '../middlewares/auth'


export class AuthRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'AuthRoutes')
	}

    configureRoutes() {
        this.app.route('/login').post([JWT.verifyToken, AuthController.login])
        
        this.app.route('/signup').post([AuthController.signup])

        return this.app
    }
}