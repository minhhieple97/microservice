const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
      id,
      title,
    };
    axios.post("http://localhost:4003/events", {
      type: "POSTCREATED",
      data: {
        id,
        title,
      },
    });
    res.status(201).send(posts[id]);
  } catch (error) {}
});
app.post("/events", (req, res) => {
  try {
    console.log("Received event", req.body);
    res.send({ status: "OK" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(4000, () => {
  console.log("Listening on 4000");
});
