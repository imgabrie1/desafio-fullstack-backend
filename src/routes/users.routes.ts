import { Router } from "express"
import { createUserController, deleteUserController, listUserByIdController, listUsersController, updateUserController } from "../controllers/users.controller"
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware"
import { userSchema, userUpdateSchema } from "../schemas/users.schema"
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware"
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware"
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware"
import ensureUserLoggedMiddleware from "../middlewares/ensureUserLogged.middleware"

const usersRoutes = Router()

usersRoutes.post(
    "",
    ensureEmailExistsMiddleware,
    ensureDataIsValidMiddleware(userSchema),
    createUserController
)
usersRoutes.get("", listUsersController)
usersRoutes.delete(
    "/:id",
    ensureUserExistsMiddleware,
    ensureTokenIsValidMiddleware,
    ensureUserLoggedMiddleware,
    deleteUserController
)

usersRoutes.get(
    "/:id",
    ensureUserExistsMiddleware,
    ensureTokenIsValidMiddleware,
    listUserByIdController
)

usersRoutes.patch(
    "/:id",
    ensureUserExistsMiddleware,
    ensureTokenIsValidMiddleware,
    ensureDataIsValidMiddleware(userUpdateSchema),
    updateUserController
)

export default usersRoutes