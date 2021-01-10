const axios = require("axios");
const express = require("express");
const app = express();
const events = [];
app.use(express.json());
app.post("/events", (req, res) => {
  try {
    const event = req.body;
    console.log({ event });
    events.push(event);
    axios.post("http://comments-service:4000/events", event); //comment
    axios.post("http://posts-cluster-ip-services:4001/events", event); // posts
    axios.post("http://query-deployment:4002/events", event); // query
    axios.post("http://moderation-service:4003/events", event); // moderation
    res.send({ status: 200, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
app.listen(8080, () => {
  console.log("Listening Event Bus on 8080");
});
app.get("/events", (req, res) => {
  res.send(events);
});
