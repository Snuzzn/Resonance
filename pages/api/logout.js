// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from "cookie";

export default (req, res) => {
  // res.clearCookie("auth", { domain: "localhost", path: "/" });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", "invalid", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
  );

  res.status(200).json({ message: "Logged out" });
};
