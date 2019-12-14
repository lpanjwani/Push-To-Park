import express from "express";
import moment from "moment-timezone";
const router = express.Router();

import Ticket from "../models/Parking";
import Zone from "../models/Zone";
import Users from "../models/Users";

router.post("/new", async (req, res) => {
  try {
    const zoneCode = await Zone.Find(
      [req.body.Location.lat, req.body.Location.lng],
      1000
    );
    const UpdateBalance = await Users.NewParkingCharge(
      "5df287db486aab0006c0acca"
    );

    const ParkingObject = await Ticket.NewTicket({
      StartTime: new moment().tz("Asia/Dubai"),
      EndTime: new moment().add(1, "hours").tz("Asia/Dubai"),
      User: {
        ID: req.body.User.ID,
        Car: req.body.User.Car
      },
      Zone: zoneCode[0].Zone
    });
    res.status(200).json({
      Timing: {
        Start: ParkingObject.StartTime,
        End: ParkingObject.EndTime
      },
      User: {
        ...ParkingObject.User,
        Balance: UpdateBalance.Balance
      },
      Zone: ParkingObject.Zone
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
});

export default router;
