const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

//Importing Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Register route
app.use("/api/auth", authRoutes);

//job route(protected route)
app.use("/api/job", jobRoutes);

//Health route for checking server is running
app.get("/", (req, res) => {
  res.json("Server is running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Server is running and database is connected");
    })
    .catch((error) => {
      console.log(error);
    });
});
