import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { iUser, iUserRepo } from "../../interfaces/users.interface"

const listUserByIdService = async (userId: number, tokenId: number): Promise<iUser> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            id: userId,
        },
        relations: {
            contact: true,
        },
        select: ["id", "name", "email", "phone", "createdAt", "contact"],
    })

    if (!user) {
        throw new AppError("User not found!")
    }

    if (user.id !== tokenId) {
        throw new AppError("unauthorized.", 401)
    }

    return user
}

export default listUserByIdService
