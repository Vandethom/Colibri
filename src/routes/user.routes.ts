import { Application } from 'express'
import { RoutesConfig } from './routesConfig'
import UserController from '../controllers/user.controller'
import JWT from '../middlewares/auth'


export class UserRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'UserRoutes')
	}

	configureRoutes() {
		this.app.route('/user/:uuid').get([JWT.verifyToken, UserController.getUserByUuid])
		this.app.route('/users').get([JWT.verifyToken, UserController.getAllUsers])

		this.app.route('/user/:uuid').put([JWT.verifyToken, UserController.updateUser])

		this.app.route('/user/:uuid').delete([JWT.verifyToken, UserController.deleteUser])


		return this.app
	}
}
