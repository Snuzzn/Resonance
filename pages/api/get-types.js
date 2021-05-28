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

      const uniqueTypes = await db.collection("content").distinct("type", {
        uid: decode(req.cookies.auth).uid,
        topic: req.query.topic,
      });
      uniqueTypes.unshift("All");
      res.status(200).json(uniqueTypes);
    } catch {
      res.status(501).json({ message: "Could not retrieve topics" });
    }
  }
});
