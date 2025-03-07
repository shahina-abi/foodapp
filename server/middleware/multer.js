

// export const upload = multer({ storage, fileFilter });
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure 'uploads' directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // ✅ Store images in 'uploads/' before uploading to Cloudinary
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({ storage });
