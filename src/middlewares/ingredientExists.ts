import { Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function checkIngredientInDB(res: Response) {
    const ingredientExists = await prisma.ingredient.findMany({
        where: {
            uuid: { in: ['1', '2', '3', '4']}
        }
    })

    if (!ingredientExists) {
        res.status(204).json('Ingredients do not currently exist in ::: Database: Colibri, Table: Ingredient')
    } else {
        res.status(200).json(ingredientExists)
    }
} 