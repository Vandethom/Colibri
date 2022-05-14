import express, { Application } from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import errorHandler from './middlewares/error-handler'
import { RoutesConfig } from './routes/routesConfig'
import { UserRoutes } from './routes/user.routes'
import { AuthRoutes } from './routes/auth.routes'
import { RecipeRoutes } from './routes/recipe.routes'


const app: Application = express()
const port = 3000
const routes: Array<RoutesConfig> = []

// Restrict all routes to only 100 requests per IP address every 10 minutes
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,    // 10 minutes
    max: 100                     // 100 requests per IP
})

app.use(
	helmet(),
	express.json(),
	limiter,
	errorHandler
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

export default app
