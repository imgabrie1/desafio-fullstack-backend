import { Router } from "express"
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware"
import { createContactController, deleteContactController, listContactByIdController, listContactsController, updateContactController } from "../controllers/contacts.controller"
import ensureUserLoggedMiddleware from "../middlewares/ensureUserLogged.middleware"
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware"
import { contactSchema } from "../schemas/contacts.schema"
import ensureContactOwnerMiddleware from "../middlewares/ensureContactOwner.middleware"

const contactRoutes: Router = Router()

contactRoutes.post("",
ensureTokenIsValidMiddleware,
ensureUserLoggedMiddleware,
ensureDataIsValidMiddleware(contactSchema),
createContactController)

contactRoutes.delete("/:id",
ensureTokenIsValidMiddleware,
ensureUserLoggedMiddleware,
ensureContactOwnerMiddleware,
deleteContactController
)

contactRoutes.get("", listContactsController)

contactRoutes.get(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureUserLoggedMiddleware,
    listContactByIdController
)

contactRoutes.patch(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureUserLoggedMiddleware,
    ensureContactOwnerMiddleware,
    updateContactController
)

export default contactRoutes