const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());
const posts = {};
app.post("/events", async (req, res) => {
  const { type } = req.body;
  switch (type) {
    case "COMMENTCREATED":
      {
        const { data } = req.body;
        const status = data.content.includes("orange")
          ? "rejected"
          : "approved";
        await axios.post("http://localhost:4005/events", {
          type: "COMMENTMODERATION",
          data: {
            id: data.id,
            content: data.content,
            postId: data.postId,
            status,
          },
        });
        posts[postId].comments.push({ id, content });
      }
      break;
    case "POSTCREATED":
      {
        const { title } = data;
        posts[id] = { id, title, comments: [] };
      }
      break;
    default:
      break;
  }
  res.status(200).json({ message: "success" });
});
app.listen(4004, () => {
  console.log("Listening moderation service on 4004");
});
