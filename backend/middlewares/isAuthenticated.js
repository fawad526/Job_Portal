import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAuthenticated;
