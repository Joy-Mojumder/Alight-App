import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRouter = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // protect router logic
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized : No token provided" });
    }
    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ error: "Unauthorized : Invalid token" });
    }

    // if all is good then
    const user = await User.findById(verified.userId).select("-password");
    // check if user exists
    if (!user) {
      return res.status(404).json({ error: "Unauthorized : User not found" });
    }

    // set user to req.user and move on to next middleware
    req.user = user;

    next();
  } catch (error) {
    // error handling for protectRouter
    console.log(`Error while protecting router: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
