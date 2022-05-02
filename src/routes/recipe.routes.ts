import { Application } from 'express'
import { RoutesConfig } from './routesConfig'
import RecipeController from '../controllers/recipe.controller'
import JWT from '../middlewares/auth'


export class RecipeRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, 'RecipeRoutes')
	}

    configureRoutes() {
        this.app.route('/recipe/:uuid').get([RecipeController.getOneRecipe])
        this.app.route('/recipe/category/:id').get([RecipeController.getRecipesByCategory])
        this.app.route('/recipes').get([RecipeController.getAllRecipes])

        this.app.route('/recipe').post([JWT.verifyToken, RecipeController.createRecipe])

        this.app.route('/recipe/:uuid').put([JWT.verifyToken, RecipeController.updateRecipe])

        this.app.route('/recipe/:uuid').delete([JWT.verifyToken, RecipeController.deleteRecipe])

        return this.app
    }
}
