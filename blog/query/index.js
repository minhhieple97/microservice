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
  try {
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
      case "COMMENTUPDATED":
        {
          const { id, postId, status, content } = data;
          const comments = posts[postId].comments;
          const comment = comments.find((comment) => comment.id === id);
          comment.status = status;
        }
        break;
      default:
        break;
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(4002, () => {
  console.log("Listening Query on 4002");
});
