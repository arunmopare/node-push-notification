const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");

const app = express();

// Set static path
app.use(express.static("client"));

app.use(bodyParser.json());
const port = 3000;

const publicVapidKey =
  "BN-StMNAjk8g8SO6P2kZGnhKYecUveszCSa_aYMDBmD67tRN_9mu0lr9FbvRGIAm9d9YYdI5tjhxCBZSfQqg184";
const privateVapidKey = "pSo2uah-LQmm6d8jvo-2-QjTZWVJ6hxzQxVSg35wZ9c";

webPush.setVapidDetails(
  "mailto:devilmops@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// create subscribe routes

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/subscribe", (req, res) => {
  // Get Push subscription object
  const subscription = req.body;

  //   Send back the status
  res.status(201).json({});

  //   Create Payload
  const payload = JSON.stringify({ title: "Push Test" });

  //pass the object into send notification
  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Server Started`));
