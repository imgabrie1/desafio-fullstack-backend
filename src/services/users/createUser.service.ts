import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { iUser, iUserRepo } from "../../interfaces/users.interface"
import { returnUserSchema } from "../../schemas/users.schema"



const createUserService = async (userData: iUser) => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const user = userRepository.create(userData)
    await userRepository.save(user)
    const newUser = returnUserSchema.parse(user)
    return newUser
}

export { createUserService }