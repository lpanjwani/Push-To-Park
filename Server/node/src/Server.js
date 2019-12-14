import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(
  express.json(),
  express.urlencoded({
    extended: true
  })
);

import Parking from "./routes/Parking";
app.use("/parking", Parking);
import User from "./routes/User";
app.use("/user", User);

app.listen(process.env.PORT, () => console.log("Backend Running on " + process.env.PORT));
