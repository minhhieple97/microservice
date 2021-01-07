const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());
// const posts = {};
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "COMMENTCREATED":
      {
        const { id, postId, content } = data;
        const status = data.content.includes("orange")
          ? "rejected"
          : "approved";
        await axios.post("http://event-bus-service:8080/events", {
          type: "COMMENTMODERATED",
          data: {
            id,
            content,
            postId,
            status,
          },
        });
        // posts[postId].comments.push({ ...data });
      }
      break;
    default:
      break;
  }
  res.status(200).json({ message: "success" });
});
app.listen(4003, () => {
  console.log("Listening moderation service on 4003");
});
