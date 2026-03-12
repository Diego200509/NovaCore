import { Request, Response } from "express";
import { BlogService } from "../services/blog.ts";

export class BlogController {
    static async getAll(req: Request, res: Response) {
        try {
            const blogs = await BlogService.getBlogs();
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch blogs",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const rawId = req.params.id;
            const id = parseInt(String(rawId), 10);
            if (isNaN(id) || id < 1) {
                return res.status(400).json({ message: "Invalid blog ID" });
            }
            const blog = await BlogService.getBlog(id);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            res.status(200).json(blog);
        } catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Blog not found"
            });
        }
    }
    static async create(req: Request, res: Response) {
        try {
            const blog = await BlogService.createBlog(req.body);
            res.status(201).json(blog);
        } catch (error) {
            res.status(400).json({
                message: "Failed to create blog",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid blog ID" });
            }

            const blog = await BlogService.updateBlog(id, req.body);
            res.status(200).json(blog);
        } catch (error) {
            res.status(400).json({
                message: "Failed to update blog",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid blog ID" });
            }

            await BlogService.deleteBlog(id);
            res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Blog not found",
            });
        }
    }
}