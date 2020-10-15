const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(express.json());
app.use(cors());
const posts = {};
const handleEvent = (type, data) => {
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
};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  try {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(4002, async () => {
  console.log("Listening Query on 4002");
  const res = await axios.get("http://localhost:8080/events");
  for (const event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
