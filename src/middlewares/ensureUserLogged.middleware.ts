import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"

const ensureUserLoggedMiddleware = async (
    req: Request,
    resp: Response,
    next: NextFunction
): Promise<Response | void> => {
    const userIdLogged: string = req.user?.id

    if (!userIdLogged){
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}

export default ensureUserLoggedMiddleware
