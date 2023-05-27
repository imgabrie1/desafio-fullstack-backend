import { Request, Response } from "express"
import { iUser } from "../interfaces/users.interface"
import { createUserService } from "../services/users/createUser.service"



const createUserController = async (req: Request, res: Response) => {
    const userData: iUser = req.body
    const newClient = await createUserService(userData)

    return res.status(201).json(newClient)
}



export { createUserController }