import { connectToDatabase } from "../../util/mongodb";
import { hash } from "bcrypt";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  if (req.method !== "POST") {
    res.status(405).json({ message: "Must be POST" });
  } else {
    // const users = await db.collection("users").find({}).toArray();
    const existingUser = await db
      .collection("users")
      .find({ email: req.body.email })
      .count();

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      hash(req.body.password, 10, async function (err, hash) {
        await db.collection("users").insertOne({
          email: req.body.email,
          name: req.body.name,
          password: hash,
        });
      });
      res.status(200).json({
        email: req.body.email,
        name: req.body.name,
      });
    }
  }
};
