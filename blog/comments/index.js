const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[req.params.id] = comments;
    const result = await axios.post("http://event-bus-service:8080/events", {
      type: "COMMENTCREATED",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
      },
    });
    res.status(201).send(comments);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.post("/events", async (req, res) => {
  try {
    const { type, data } = req.body;
    switch (type) {
      case "COMMENTMODERATED":
        const { id, postId, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find((comment) => comment.id === id);
        comment.status = status;
        // send event to event-bus
        await axios.post("http://event-bus-service:8080/events", {
          type: "COMMENTUPDATED",
          data: {
            id,
            postId,
            status,
            content,
          },
        });
        break;
      default:
        break;
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(4000, () => {
  console.log("Listening Comments on 4000");
});
