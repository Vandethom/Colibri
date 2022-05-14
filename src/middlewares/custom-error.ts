export class CustomError {
    message!: string
    status!: number
    additionalMessage!: any

    constructor(message: string, status = 500, additionalMessage: any = {}) {
        this.message = message
        this.status = status
        this.additionalMessage = additionalMessage
      }
}