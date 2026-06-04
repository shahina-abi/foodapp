
// import jwt from "jsonwebtoken";
//  export const authUser = (req, res, next) => {
//     try {
//         const { token } = req.cookies;

//         if (!token) {
//             return res.status(401).json({ message: "token not provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


//         if (!decoded) {
//             return res.status(401).json({ message: "user not autherized" });
//         }

//         req.user = decoded;

//         next();
//     } catch (error) {
//         res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
//     }
// };
import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
    try {
        // ✅ Check cookie first, then fall back to Authorization header
        let token = req.cookies?.token;

        if (!token) {
            const authHeader = req.headers?.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(401).json({ message: "token not provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "user not authorized" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};