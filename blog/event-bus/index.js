const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());
app.post("/events", (req, res) => {
  try {
    const event = req.body;
    axios.post("http://localhost:4000/events", event); //comment
    axios.post("http://localhost:4001/events", event); // posts
    axios.post("http://localhost:4002/events", event); // query
    axios.post("http://localhost:4003/events", event); // moderation
    res.send({ status: 200, message: "success" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(8080, () => {
  console.log("Listening Event Bus on 8080");
});
