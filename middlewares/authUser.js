import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    console.log(
      `[AUTH] 401 Unauthorized - No token, ${req.method} ${req.originalUrl} from ${req.ip}`
    );
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log(
      `[AUTH] 401 Invalid token - ${req.method} ${req.originalUrl} from ${req.ip}`
    );
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authUser;
