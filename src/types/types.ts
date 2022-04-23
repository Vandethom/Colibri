export type User = {
    uuid: string
    isAdmin: boolean

    firstName: string
    lastName: string
    email: string
    password: string
    recipes: Array<Recipe>

    created_at: Date
    updated_at: Date
}

export type Recipe = {
    uuid: string
    author: User
    authorId: string
    
    name: string
    steps: string
    ingredients: Array<Ingredient>

    isVegan: boolean
    hasPork: boolean
    hasGluten: boolean

    created_at: Date
    updated_at: Date
}

export type Ingredient = {
    uuid: string

    name: string
    family: string

    created_at: Date
    updated_at: Date
}
