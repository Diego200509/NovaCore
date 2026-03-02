import { v2 as cloudinary } from "cloudinary";
import { env } from "../../config/env.ts";

class CloudinaryUploader {
    constructor() {
        cloudinary.config({
            cloud_name: env.CLOUDINARY_NAME,
            api_key: env.CLOUDINARY_API_KEY,
            api_secret: env.CLOUDINARY_API_SECRET
        })
    }
    get instance() {
        return cloudinary;
    }
}

export const cloudinaryUploader = new CloudinaryUploader();