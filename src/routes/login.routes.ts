import { Router } from "express"
import createLoginController from "../controllers/login.controller"

const loginRoute: Router = Router()

loginRoute.post("", createLoginController)

export default loginRoute
