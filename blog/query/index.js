const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "COMMENTCREATED":
      {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });
      }
      break;
    case "POSTCREATED":
      {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
      }
      break;
    default:
      break;
  }
  res.status(200).json({ message: "success" });
});
app.listen(4002, () => {
  console.log("Listening Query on 4002");
});
