import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { uuid as v4 } from 'uuidv4'
// import checkIngredientInDB from '../middlewares/ingredientExists'
// import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
//    token = process.env.SECRET_TOKEN as string

class RecipeController {

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get one Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipe/:uuid  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async getOneRecipe (req: Request, res: Response) {
        const uuid = req.params.uuid,
            recipe = await prisma.recipe.findUnique({
                where: {
                    uuid: uuid
                },
                include: {
                    ingredients: true
                }
            })
        
        res.status(200).json(recipe)
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get Recipes by Category  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipe/category/:id  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async getRecipesByCategory () {
        console.log('Soon, I\'ll be a real function.')
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get all Recipes  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipes  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async getAllRecipes (req: Request, res: Response) {
        const recipes = await prisma.recipe.findMany({
            include: {
                ingredients: true
            }
        })

        res.status(200).json(recipes)
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Create a Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async createRecipe (req: Request, res: Response) {
        const { authorUuid, name, steps, ingredients, vegan, porkFree, glutenFree } = req.body,
            userExists = await prisma.user.findUnique({
                where: { 
                    uuid: '34ae65c3-426d-4327-8dbc-78bca22197fa'
                }
            })

        if (!userExists) {
            res.status(500).json('Error retrieving the author of the recipe => Recipe was not saved in the database.')
        } else {
            try {             
                const recipe = await prisma.recipe.create({
                    data: {
                        authorUuid: '34ae65c3-426d-4327-8dbc-78bca22197fa',
                        name: name,
                        steps: steps,
                        // ingredients: {
                        //     create : [{ uuid : v4(), name: ingredients }]
                        // },
                        vegan: true,
                        porkFree: true,
                        glutenFree: true
                    }
                    })
                res.status(201).json(recipe)
            } catch (error) {
                res.status(500).json({ error: error })
            }
            
        }   
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Update Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipe/:uuid  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async updateRecipe (req: Request, res: Response) {
        const uuid = req.params.uuid,
            { name, steps, ingredientsList, vegan, porkFree, glutenFree } = req.body
            try {
                console.log(ingredientsList.map((ingredient: string) => ({ name: ingredient })))
                const updatedRecipe = await prisma.recipe.update({
                    where: { uuid: uuid },
                        data: {
                            name: name,
                            steps: steps,
                            ingredients: { 
                                set: [], 
                                connectOrCreate: ingredientsList.map((ingredient: string) => ({
                                    where: { name: ingredient }, create:  { name: ingredient } 
                                })) },
                            vegan: vegan,
                            porkFree: porkFree,
                            glutenFree: glutenFree
                        }
                    })
                res.status(200).json(updatedRecipe)        
            } catch (error) {
                res.status(500).json({ error: 'All fields are required my dear.' })
            }
    }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Delete Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipe/:uuid  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async deleteRecipe (req: Request, res: Response) {
        const uuid = req.params.uuid,
            recipeToDelete = await prisma.recipe.delete({
                where: {
                    uuid: uuid
                },
            })

        res.status(204).json(recipeToDelete)
    }

}

export default new RecipeController()
