const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://pranavkardile777:DSAjava%40c++@cluster0.uvqxurc.mongodb.net/courses",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

app.listen(3000, () => console.log("Server running on port 3000"));
