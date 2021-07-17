const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bookModel = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(bookModel);
const { json } = require("express");

dotenv.config();
const DBURL = process.env.DB_URL;
const PORT = process.env.PORT || 5002;
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Server is running..");
});

app.listen(PORT, () => {
  console.log(`server is started on port: ${PORT}`);
});
