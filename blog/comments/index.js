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
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  axios.post("http://localhost:4003/events", {
    type: "COMMENTCREATED",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});
app.post("/events", (req, res) => {
  try {
    console.log("Received event", req.body);
    res.send({ status: "OK" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(4001, () => {
  console.log("Listening on 4001");
});
