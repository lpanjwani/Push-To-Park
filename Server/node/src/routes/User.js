import express from "express";
import moment from "moment-timezone";
const router = express.Router();

import Ticket from "../models/Parking";
import Zone from "../models/Zone";
import Users from "../models/Users";

import Expo from "../controllers/Expo";

router.get("/:id/balance/", async (req, res) => {
  const balance = await Users.GetBalance(req.params.id);
  res.status(200).json({ status: true, Balance: balance });
});

router.post("/:id/balance/recharge/now", async (req, res) => {
  const user = await Users.newPushKey(req.params.id, req.body.amount);
  res.status(200).send(user);
});

router.get("/:id/transactions/", async (req, res) => {
  const user = await Ticket.GetTicketForUser(req.params.id);
  res.status(200).send(user);
});

router.get("/:id/push/", async (req, res) => {
  const user = await Users.getPushKey(req.params.id);
  res.status(200).json({ status: true, userID: req.params.id, PushKey: user });
});

router.post("/:id/push/update", async (req, res) => {
  console.log(typeof req.body.token);
  const user = await Users.newPushKey(req.params.id, req.body.token);
  res.status(200).json({ status: true, userID: req.params.id, PushKey: user });

  Expo.SendPush(req.params.id, "Hello");
});

export default router;
