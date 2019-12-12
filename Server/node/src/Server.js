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

app.listen(process.env.Port, () => console.log("Backend Running"));
