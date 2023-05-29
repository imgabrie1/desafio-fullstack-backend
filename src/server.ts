import app from "./app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(() => {
    console.log("Database connected!")
    const PORT: number = 3000
    app.listen(PORT, async () => {
        console.log(`server is running in port: ${PORT}`)
    })
}).catch(err => {
    console.log(err)
})