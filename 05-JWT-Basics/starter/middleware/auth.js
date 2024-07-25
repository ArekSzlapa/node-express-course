const jwt = require("jsonwebtoken");
const { UnauthinticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthinticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
  } catch (error) {
    throw new UnauthinticatedError("Not authorized to access this route");
  }

  next();
};

module.exports = authMiddleware;
