import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iUserRepo, iUserReturn, iUserUpdate } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schema";

const updateUserService = async (newUserData: iUserUpdate, userId: number): Promise<iUserReturn> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const oldUser = await userRepository.findOneBy({
        id: userId
    })

    const user = userRepository.create({
        ...oldUser,
        ...newUserData,
    })

    await userRepository.save(user)
    const updateUser = returnUserSchema.parse(user)

    return updateUser
}

export default updateUserService