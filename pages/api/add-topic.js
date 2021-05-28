// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../util/mongodb";
import { verify, decode } from "jsonwebtoken";
const axios = require("axios");
const cheerio = require("cheerio");
import { authenticated } from "./authWrapper";

export default authenticated(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Must be POST" });
  } else {
    try {
      const { db } = await connectToDatabase();

      const users = await db.collection("users").update(
        {
          email: decode(req.cookies.auth).email,
        },
        {
          $push: {
            topics: { title: req.body.topic },
          },
        },
        { upsert: true }
      );

      res.status(200).json({ message: "Your topic name was added" });
    } catch {
      res.status(501).json({ message: "Could not add content" });
    }
  }
});
