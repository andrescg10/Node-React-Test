const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const comments = [];

app.get("/:id", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/:id", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const commentNew = comments[req.params.id] || [];
  commentNew.push({ id: commentId, content, status: "pending" });
  comments[req.params.id] = commentNew;
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = comments[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4001);
