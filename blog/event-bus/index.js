const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());
app.post("/events", (req, res) => {
  try {
    const event = req.body;
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4004/events", event);

    res.send({ status: "OK" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("Listening Event Bus on 8080");
});
