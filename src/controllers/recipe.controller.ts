import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
// import checkIngredientInDB from '../middlewares/ingredientExists'
// import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
//    token = process.env.SECRET_TOKEN as string

class AuthController {

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Get one Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipe/:uuid  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async getOneRecipe (req: Request, res: Response) {
        const uuid = req.params.uuid,
            recipe = await prisma.recipe.findUnique({
                where: {
                    uuid: uuid
                },
                include: { ingredients: true }
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
            include: { ingredients: true }
        })

        res.status(200).json(recipes)
    }

    // async checkIfIngredientsInDB (req: Request, res: Response, ingredientsList: string[]) {
    //     const ingredientsExist = await prisma.ingredient.findMany({
    //             where: {
    //                 name: { in: ingredientsList}
    //             }
    //         })
        
    //     for (const i = 0; i < ingredientsExist.length; i + 1) {
    //         if (!ingredientsExist[i]) {
    //             await prisma.ingredient.create(ingredientsExist[i])
    //         }
    //     }
    // }

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Create a Recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/recipe  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async createRecipe (req: Request, res: Response) {
        const { authorUuid, name, steps, ingredientsList, vegan, porkFree, glutenFree } = req.body,
            userExists = await prisma.user.findUnique({
                where: { 
                    uuid: authorUuid
                }
            })

        if (!userExists) {
            res.status(500).json('Error retrieving the author of the recipe => Recipe was not saved in the database.')
        } else {
            try {                
                const recipe = await prisma.recipe.create({
                    data: {
                        authorUuid: authorUuid,
                        name: name,
                        steps: steps,
                        ingredients: { connectOrCreate: ingredientsList.map((ingredient: string) => ({
                            where: { name: ingredient }, create:  { name: ingredient } 
                          })) },
                        vegan: vegan,
                        porkFree: porkFree,
                        glutenFree: glutenFree
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
    async deleteRecipe () {
        console.log('Soon, I\'ll be a real function.')
    }

}

export default new AuthController()
