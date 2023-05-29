import "dotenv/config"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import { iLogin } from "../../interfaces/login.interface"
import { iUserRepo } from "../../interfaces/users.interface"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"

const createLoginService = async (loginData: iLogin): Promise<string> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const user: User | null = await userRepository.findOneBy({
        email: loginData.email,
    })

    if (!user) {
        throw new AppError("Invalid credentials", 401)
    }

    const passwordMatch = await compare(loginData.password, user.password)

    if (!passwordMatch) {
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = jwt.sign(
        {
            id: user.id,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: String(user.id),
        }
    )

    return token
}

export default createLoginService
