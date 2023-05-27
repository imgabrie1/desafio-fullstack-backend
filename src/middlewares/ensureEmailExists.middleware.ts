import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { iUserRepo } from "../interfaces/users.interface"
import { User } from "../entities/user.entity"

const ensureEmailExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const userEmail = req.body.email
    const findUserEmail = await userRepository.findOne({
        where: {
            email: userEmail,
        },
    })

    if (!Object.keys(req.body).includes("email")) {
        return next()
    }

    if (findUserEmail) {
        throw new AppError("Email already exists", 409)
    }

    return next()
}

export default ensureEmailExistsMiddleware
