import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { iUserRepo, iUsersReturn } from "../../interfaces/users.interface"
import { returnMultipleUsersSchema } from "../../schemas/users.schema"

const listUsersService = async (): Promise<iUsersReturn> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const findUsers: Array<User> = await userRepository.find()
    const users = returnMultipleUsersSchema.parse(findUsers)

    return users
}

export default listUsersService
