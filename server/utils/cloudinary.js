


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ✅ Function to Upload File to Cloudinary
export const handleImageUpload = async (filePath) => {
    try {
        // ✅ Upload file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: "food-items", // Save in "food-items" folder
            resource_type: "image",
        });

        // ✅ Delete local file after successful upload
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete local file:", err);
            }
        });

        return uploadResult.secure_url; // ✅ Return Cloudinary URL
    } catch (error) {
        throw new Error("Image upload failed: " + error.message);
    }
};
