const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Kết nối MongoDB thành công");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server đang chạy tại http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log(err));
