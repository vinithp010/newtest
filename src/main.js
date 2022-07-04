require("dotenv").config();

const express = require("express");
const cors = require("../configs/cors.config");
// const db = require("../database/models");
const apiRouter = require("./api/api.router");

const app = express();

app.use(express.json());

app.use(express.urlencoded({
 extended: true
}));

cors(app)

app.use("/api", apiRouter);

app.get("/", (req, res) => res.status(200).send("Welcome to Arthmate APIs! Work in progress.....please be patient."));

app.use((req, res, next) => {
  const error = new Error(`404 Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});


app.listen(process.env.PORT || 3000);

app.use((err, req, res, next) => {
  if (!err) {
    return next();
  }

  res.status(500).send(err);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
});

process.stdin.resume();

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM"].forEach((eventType) => {
  process.on(eventType, () => {
    console.log("Byeeeee....");
    process.exit();
  });
});
