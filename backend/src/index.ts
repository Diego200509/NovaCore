import express, { Request, Response } from "express"
import cors from "cors";
import blogRoutes from "./view/blog.routes.ts"
import { env } from "./config/env.ts"
import { BlogService } from "./services/blog.ts"
import { setBlogsCache } from "./infrastructure/cache/blogs-cache.ts"

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

// Health check ligero (para pings de keep-alive y Render)
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, message: "ok" })
})

app.use("/blogs", blogRoutes)
app.use("/", (req: Request, res: Response) => { res.send({ message: `App running` }) })
const PORT = env["PORT"]
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
    // Calentar caché de blogs en segundo plano (respuesta más rápida en la primera petición)
    setImmediate(async () => {
        try {
            const blogs = await BlogService.getBlogs()
            setBlogsCache(blogs)
            console.log("Blogs cache warmed up")
        } catch (e) {
            console.warn("Blogs cache warm-up failed:", e instanceof Error ? e.message : e)
        }
    })
})