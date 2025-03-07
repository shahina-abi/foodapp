

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
import fs from "fs";
import path from "path";

// Ensure 'uploads/' exists before storing files
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const upload = multer({ storage });
