// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../util/mongodb";
import { verify, decode } from "jsonwebtoken";
const axios = require("axios");
const cheerio = require("cheerio");
import { authenticated } from "./authWrapper";
let ObjectId = require("mongodb").ObjectID;

export default authenticated(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Must be POST" });
  } else {
    try {
      const { db } = await connectToDatabase();

      const bookmark = await db
        .collection("content")
        .findOne({ _id: ObjectId(req.body._id) });
      const content = await db
        .collection("content")
        .update(
          { _id: ObjectId(req.body._id) },
          { $set: { consumed: !bookmark.consumed } }
        );
      console.log(content);
      // uniqueTypes.unshift("All");
      res.status(200).json(bookmark);
    } catch {
      res.status(501).json({ message: "Could not retrieve topics" });
    }
  }
});
