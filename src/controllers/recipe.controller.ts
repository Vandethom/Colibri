import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
// import checkIngredientInDB from '../middlewares/ingredientExists'
// import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
//    token = process.env.SECRET_TOKEN as string

class AuthController {

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get one Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async getOneRecipe (req: Request, res: Response) {
        const uuid = req.params.uuid,
            recipe = await prisma.recipe.findUnique({
                where: {
                    uuid: uuid
                }
            })
        
        res.status(200).json(recipe)
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get Recipes by Category  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async getRecipesByCategory () {
        console.log('Soon, I\'ll be a real function.')
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get all Recipes  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async getAllRecipes (req: Request, res: Response) {
        const recipesUuids = new Array(JSON.stringify(req.body)),
            ingredientExists = await prisma.ingredient.findMany({
                where: {
                    uuid: { in: recipesUuids }
                }
            })
        // TODO: 
        // La fonction ne semble pas aller chercher les ID dans la DB
        // PISTE 1 : le format de l'array fourni
        // PISTE 2 : changer id par uuid
        // PISTE 3 : IMPROBABLE : vérifier le type des donnée passées (string, number ?)
    
        if (!ingredientExists) {
            res.json('Ingredients do not currently exist in ::: Database: Colibri, Table: Ingredient')
        } else {
            res.json(ingredientExists)
        }
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Create a Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async createRecipe (req: Request, res: Response) {
        const { name, steps, vegan, porkFree, glutenFree} = req.body,
            userExists = await prisma.user.findUnique({
                where: { 
                    uuid: 'a067fc81-1208-487f-b0cd-6df13d7185ce'
                }
            })

        if (!userExists) {
            res.status(500).json('Error retrieving the author of the recipe.')

        } else {
            const recipe = await prisma.recipe.create({
                    data: {
                        authorId: 'a067fc81-1208-487f-b0cd-6df13d7185ce',
                        name: name,
                        steps: steps,
                        vegan: vegan,
                        porkFree: porkFree,
                        glutenFree: glutenFree
                    }
                })

            res.status(201).json(recipe)
        }

        
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Update Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async updateRecipe () {
        console.log('Soon, I\'ll be a real function.')
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Delete Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async deleteRecipe () {
        console.log('Soon, I\'ll be a real function.')
    }

}

export default new AuthController()
