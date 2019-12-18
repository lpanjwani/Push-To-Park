import express from "express";
import moment from "moment-timezone";
const router = express.Router();

import Ticket from "../models/Parking";
import Zone from "../models/Zone";
import Users from "../models/Users";

router.get("/all", async (req, res) => {

    const zoneCode = await Zone.FindAll();
    res.status(200).send(zoneCode);
});

export default router;
