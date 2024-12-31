import jwt from "jsonwebtoken";

// This middleware protect routes and ensure that only authenticated users can access resources
// If a valid token is found, it extracts user information from it and allows the request to proceed
// If not, it responds with an authentication error
const authenticateMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret-key",
    );

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default authenticateMiddleware;
