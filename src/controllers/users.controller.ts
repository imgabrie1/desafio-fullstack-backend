import { Request, Response } from "express"
import { iUser, iUserUpdate } from "../interfaces/users.interface"
import { createUserService } from "../services/users/createUser.service"
import listUsersService from "../services/users/listUsers.service"
import deleteUserService from "../services/users/deleteUser.service"
import listUserByIdService from "../services/users/listUserById.service"
import updateUserService from "../services/users/updateUser.service"



const createUserController = async (req: Request, res: Response) => {
    const userData: iUser = req.body
    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService()

    return res.json(users)
}

const deleteUserController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)
    await deleteUserService(userId)

    return res.status(204).send()
}

const listUserByIdController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)
    const tokenId = parseInt(req.user.id)
    const user = await listUserByIdService(userId, tokenId)

    return res.json(user)
}
const updateUserController = async (req: Request, res: Response) => {
    const userData: iUserUpdate = req.body
    const userId = parseInt(req.params.id)
    const userUpdated = await updateUserService(userData, userId)

    return res.json(userUpdated)
}




export { createUserController, listUsersController, deleteUserController, listUserByIdController, updateUserController }