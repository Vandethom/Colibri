import express, { Application } from 'express'
import helmet from 'helmet'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sanitize = require('sanitize')

import { RoutesConfig } from './routes/routesConfig'
import { UserRoutes } from './routes/user.routes'
import { AuthRoutes } from './routes/auth.routes'
import { RecipeRoutes } from './routes/recipe.routes'


const app: Application = express()
const port = 3000
const routes: Array<RoutesConfig> = []

app.use(
	helmet(),
	sanitize,
	express.json()
	)

routes.push(
	new UserRoutes(app),
	new AuthRoutes(app),
	new RecipeRoutes(app)
	)

app.listen(port, () => {
	console.log(`Server is listening on port ${port} !`)

	routes.forEach((route: RoutesConfig) => {
		console.log(`Routes configured for ${route.getName()}`)
	})
})
