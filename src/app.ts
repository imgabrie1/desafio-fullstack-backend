import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express"
import cors from "cors"
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware"
import usersRoutes from "./routes/users.routes"
import loginRoute from "./routes/login.routes"


const app: Application = express()
app.use(cors())
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/login", loginRoute)

app.use(handleAppErrorMiddleware)
export default app