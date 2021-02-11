const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});
app.get("/", (req, res) => {
  res.send(posts);
});

app.post("/", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { titulo } = req.body;
  posts[id] = {
    id,
    titulo,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      titulo,
    },
  });
  res.status(201).send(posts[id]);
});

app.listen(4000);
