import { connectToDatabase } from "../../util/mongodb";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method !== "POST") {
    res.status(405).json({ message: "Must be POST" });
  } else {
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({ message: "Account not found." });
    } else {
      // check if hashed password matches the one in db
      compare(req.body.password, user.password, function(err, result) {
        if (!err && result) {
          const claims = { email: req.body.email, uid: user._id };
          const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: "1h" });
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", jwt, {
              // httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            })
          );

          res.status(200).json({ message: "Welcome! Logging you in..." });
        } else {
          res.status(400).json({
            message: "Your password was incorrect. Please try again.",
          });
        }
      });
    }
  }
};
