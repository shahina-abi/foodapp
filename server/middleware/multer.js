

// // // export const upload = multer({ storage, fileFilter });
// // import multer from "multer";
// // import path from "path";
// // import fs from "fs";

// // // Ensure 'uploads' directory exists
// // const uploadDir = "uploads/";
// // if (!fs.existsSync(uploadDir)) {
// //     fs.mkdirSync(uploadDir, { recursive: true });
// // }

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, "uploads/"); // ✅ Store images in 'uploads/' before uploading to Cloudinary
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, `${Date.now()}-${file.originalname}`);
// //     }
// // });

// // export const upload = multer({ storage });
// import multer from "multer";
// import fs from "fs";
// import path from "path";

// // Ensure 'uploads/' exists before storing files
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// export const upload = multer({ storage });
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Optional: Folder in Cloudinary to store files
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional: Resize images
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

export default upload;