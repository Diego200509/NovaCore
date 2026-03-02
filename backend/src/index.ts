import express, { Request, Response } from "express"
import cors from "cors";
import blogRoutes from "./view/blog.routes.ts"
import { env } from "./config/env.ts"

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use("/blogs", blogRoutes)
app.use("/", (req: Request, res: Response) => { res.send({ message: `App running` }) })
const PORT = env["PORT"]
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})