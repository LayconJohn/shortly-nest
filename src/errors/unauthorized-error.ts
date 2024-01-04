export class UnauthorzedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "UnauthorizedError"
    }
}