import prisma from "../infrastructure/repository/prisma.ts";

export class BlogModel {
    static async findAll() {
        return await prisma.blogs.findMany({
            orderBy: [
                { createdAt: 'desc' },
                { id: 'desc' }
            ]
        });
    }
    static async findById(id: number) {
        return await prisma.blogs.findUnique({
            where: { id }
        })
    }
    static async create(data: {
        title: string;
        urls: string[];
        description: string;
        authors: string[];
        tags: string[];
        image?: string;
        imagePublicId?: string;
    }) {
        return prisma.blogs.create({
            data
        });
    }
    static async update(id: number, data: {
        title?: string;
        urls?: string[];
        description?: string;
        authors?: string[];
        tags?: string[];
        image?: string;
        imagePublicId?: string;
    }
    ) {
        try {
            return prisma.blogs.update({
                where: { id },
                data
            });
        } catch {
            return null;
        }
    }
    static async delete(id: number) {
        try {
            return prisma.blogs.delete({
                where: { id }
            })
        } catch {
            return null
        }
    }
}