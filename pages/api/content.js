// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../util/mongodb";
import { authenticated } from "./authWrapper";
import { decode } from "jsonwebtoken";
export default authenticated(async (req, res) => {
  if (req.method != "GET") {
    res.status(405).json({ message: "Must be GET" });
    return;
  } else {
    try {
      const { db } = await connectToDatabase();
      // console.log(req.query.filter);
      let query = { uid: decode(req.cookies.auth).uid, topic: req.query.topic };
      if (req.query.type !== "All") {
        query.type = req.query.type;
      }
      switch (req.query.filter) {
        case "Consumed":
          query.consumed = true;
          break;
        case "To consume":
          query.consumed = false;
          break;
        case "Favourites":
          query.fave = true;
          break;
      }

      const bookmarks = await db
        .collection("content")
        .find(query)
        .toArray();

      // console.log(bookmarks);
      if (bookmarks.length == 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(bookmarks);
      }
    } catch {
      res.status(501).json({ message: "Couldn't retrieve content" });
    }
  }
});

// const bookmarks = await db
//   .collection("users")
//   .find(
//     {
//       email: decode(req.cookies.auth).email,
//       // "bookmarks.topic": req.query.topic,
//     }
//     // { bookmarks: { $elemMatch: { topic: "Coding" } } }
//     // { projection: { bookmarks: { $elemMatch: { topic: "Art" } } } }
//   )
//   .project({
//     // bookmarks: 1,
//     _id: 0,
//     bookmarks: { $elemMatch: { topic: "Art" } },
//   })
//   .toArray();
