const express = require("express");
const apiMocker = require("connect-api-mocker");

const port = 9000;
const app = express();

var cors = require("cors");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use("/api", apiMocker("mock-api"));

console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);
