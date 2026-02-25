import { UploadApiResponse } from "cloudinary";
import { cloudinaryUploader } from "../infrastructure/upload/cloudinary.ts";

export class CloudinaryService {
  static async uploadImage(
    file: string | Buffer,
    folder: string = "uploads"
  ): Promise<{ url: string; public_id: string }> {
    try {
      const result: UploadApiResponse =
        await cloudinaryUploader.instance.uploader.upload(file as string, {
          folder,
          resource_type: "auto",
          transformation: [
            { width: 800, height: 600, crop: "fill" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      throw new Error("Cloudinary upload failed");
    }
  }

  static async deleteImage(public_id: string): Promise<boolean> {
    try {
      await cloudinaryUploader.instance.uploader.destroy(public_id);
      return true;
    } catch (error) {
      throw new Error("Cloudinary deletion failed");
    }
  }
}