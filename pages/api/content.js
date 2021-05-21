// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../util/mongodb";
import { authenticated } from "./authWrapper";

export default authenticated(async (req, res) => {
  if (req.method != "GET") {
    res.status(405).json({ message: "Must be GET" });
    return;
  } else {
    try {
      const { db } = await connectToDatabase();
      const bookmarks = await db
        .collection("content")
        .find({ topic: req.query.topic })
        .toArray();
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
