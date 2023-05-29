import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { iUserRepo } from "../../interfaces/users.interface"

const deleteUserService = async (userId: number): Promise<void> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    await userRepository.remove(user!)
}

export default deleteUserService