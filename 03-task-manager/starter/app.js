const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler-middleware");
const os = require("os");
require("dotenv").config();

// middlewares
app.use([express.static("./public"), express.json()]);
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// routes
app.get("/", (req, res) => {
  res.end("Task Manager App");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Connected");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
