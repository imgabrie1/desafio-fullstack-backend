import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { iUserRepo } from "../interfaces/users.interface"
import { User } from "../entities/user.entity"

const ensureUserExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOne({
        where: {
            id: parseInt(req.params.id) || parseInt(req.user.id),
        },
    })

    if (!findUser) {
        throw new AppError("User not found", 404)
    }

    return next()
}

export default ensureUserExistsMiddleware
