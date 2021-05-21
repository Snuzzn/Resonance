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
    const img = getImg(req.body.link);
    const title = await getTitle(req.body.link);
    if (img == "") {
      res.status(501).json({ message: "could not retrieve info about link" });
      return;
    }
    try {
      const { db } = await connectToDatabase();

      await db.collection("content").update(
        {
          uid: decode(req.cookies.auth).uid,
          topic: req.body.topic,
          type: req.body.type,
          link: req.body.link,
        },
        {
          uid: decode(req.cookies.auth).uid,
          topic: req.body.topic,
          type: req.body.type,
          link: req.body.link,
          img: img,
          title: title,
        },
        { upsert: true }
      );
      res.status(200).json({ message: "successfully added content" });
    } catch {
      res.status(501).json({ message: "could not add content" });
    }
  }
});

const getImg = (link) => {
  if (link.includes("youtube.com/watch")) {
    const match = link.match(/v=(\S+)/);
    if (match) {
      const img = `https://i3.ytimg.com/vi/${match[1]}/maxresdefault.jpg`;
      return img;
    } else {
      return "";
    }
  } else {
    const url = link;
    let domain = new URL(url);
    domain = domain.hostname;
    return `https://logo.clearbit.com/${domain}`;
    // const match = link.match(/https?:\/\/(.+?\.)?example\.com/);
    // if (match) {
    //   console.log(match)
    //   const logoLink = `https://logo.clearbit.com/${match[1]}`;
    //   return logoLink;
    // } else {
    //   return "";
    // }
    // console.log(logoLink);
  }
};

const getTitle = async (link) => {
  const response = await axios.get(link);
  var $ = cheerio.load(response.data);
  let title = $("title").text();
  // console.log(title);
  title = title.replace(/^(.+)–\s.+$/, "$1");
  console.log(title);
  return title;
};

// await db.collection("users").updateOne(
//   { email: decode(req.cookies.auth).email },
//   {
//     $addToSet: {
//       bookmarks: {
//         topic: req.body.topic,
//         type: req.body.type,
//         link: req.body.link,
//         img: img,
//         title: title,
//       },
//     },
//   }
// );
