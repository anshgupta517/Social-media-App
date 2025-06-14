import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

