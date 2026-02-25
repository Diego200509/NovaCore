import { BlogSchema } from "../infrastructure/validators/blog.ts";
import { BlogModel } from "../model/blog.ts";
import { CloudinaryService } from "./image.ts";

interface BlogCreateData {
    title: string;
    urls: string[];
    description: string;
    authors: string[];
    tags: string[];
    imageBase64: string;
}

interface BlogEditData {
    title?: string;
    urls?: string[];
    description?: string;
    authors?: string[];
    tags?: string[];
    imageBase64?: string;
}
export class BlogService {
    static async getBlogs() {
        return BlogModel.findAll();
    }
    static async getBlog(id: number) {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    }
    static async createBlog(data: BlogCreateData) {
        const upload = await CloudinaryService.uploadImage(
            data.imageBase64,
            "blogs"
        );
        try {

            const validated = BlogSchema.parse({
                ...data,
                image: upload.url,
            });
            return BlogModel.create({
                title: validated.title,
                description: validated.description,
                urls: validated.urls,
                authors: validated.authors,
                tags: validated.tags || [],
                image: upload.url,
                imagePublicId: upload.public_id,
            });
        } catch (error) {
            await CloudinaryService.deleteImage(upload.public_id);
            throw error;
        }
    }

    static async updateBlog(id: number, newData: BlogEditData) {
        const existingBlog = await BlogModel.findById(id);
        if (!existingBlog) {
            throw new Error("Blog not found");
        }
        
        let imageUrl = existingBlog.image;
        let imagePublicId = existingBlog.imagePublicId;
        const validated = BlogSchema.partial().parse({
            ...newData,
            image: imageUrl,
        });
        if (newData.imageBase64) {
            const upload = await CloudinaryService.uploadImage(
                newData.imageBase64,
                "blogs"
            );
            try {
                const updated = await BlogModel.update(id, {
                    ...validated,
                    image: upload.url,
                    imagePublicId: upload.public_id,
                });
                
                if (existingBlog.imagePublicId) {
                    await CloudinaryService.deleteImage(existingBlog.imagePublicId);
                }

                return updated;
                
            } catch (error) {
                await CloudinaryService.deleteImage(upload.public_id);
                throw error;
            }
        }
        return BlogModel.update(id, {
            ...validated,
            image: imageUrl,
            imagePublicId,
        });
    }

    static async deleteBlog(id: number) {
        const existingBlog = await BlogModel.findById(id);
        if (!existingBlog) {
            throw new Error("Blog not found");
        }
        if (existingBlog.imagePublicId) {
            await CloudinaryService.deleteImage(existingBlog.imagePublicId);
        }
        return BlogModel.delete(id);
    }
}