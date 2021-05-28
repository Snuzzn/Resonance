// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../util/mongodb";
import { verify, decode } from "jsonwebtoken";
const axios = require("axios");
const cheerio = require("cheerio");
import { authenticated } from "./authWrapper";

export default authenticated(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Must be GET" });
  } else {
    try {
      const { db } = await connectToDatabase();

      const user = await db
        .collection("users")
        .find({ email: decode(req.cookies.auth).email })
        .toArray();

      if (typeof user[0].topics != "undefined") {
        // console.log(user[0].topics);
        res.status(200).json(user[0].topics);
      } else {
        res.status(200).json([]);
      }
    } catch {
      res.status(501).json({ message: "Could not retrieve topics" });
    }
  }
});
