

// // export const upload = multer({ storage, fileFilter });
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Ensure 'uploads' directory exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // ✅ Store images in 'uploads/' before uploading to Cloudinary
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// export const upload = multer({ storage });
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "food-ordering-images", // Folder name in Cloudinary
    allowed_formats: ["jpeg", "jpg", "png"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// Multer Upload Middleware
const upload = multer({ storage });

export default upload;
