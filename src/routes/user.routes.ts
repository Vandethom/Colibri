import { Application } from 'express'
import { RoutesConfig } from './routesConfig'
import UserController from '../controllers/user.controller'

import * as dotenv from 'dotenv'
dotenv.config()

export class UserRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'UserRoutes')
	}

	configureRoutes() {
		this.app.route('/user/:uuid').get([UserController.getUserById])
		this.app.route('/users').get([UserController.getAllUsers])

		this.app.route('/user/:uuid').put([UserController.updateUser])

		this.app.route('/user/:uuid').delete([UserController.deleteUser])


		return this.app
	}
}
