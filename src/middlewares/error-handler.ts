import { Request, Response, NextFunction } from 'express'
import { CustomError } from './custom-error'

function handleError(err: TypeError | CustomError, req: Request, res: Response, next: NextFunction) {
  let customError = err

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      `We're sorry this error seems not to be detected now. Please open a ticket so we may correct it.`
    )
  }

  res.status((customError as CustomError).status).send(customError)
}

export default handleError