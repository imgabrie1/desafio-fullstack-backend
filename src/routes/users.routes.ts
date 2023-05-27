import { Router } from "express"
import { createUserController } from "../controllers/users.controller"
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware"
import { userSchema } from "../schemas/users.schema"
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware"

const usersRoutes = Router()

usersRoutes.post(
    "",
    ensureEmailExistsMiddleware,
    ensureDataIsValidMiddleware(userSchema),
    createUserController
)

export default usersRoutes