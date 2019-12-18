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

router.get("/:id/transactions/valid", async (req, res) => {
	const user = await Ticket.GetTicketForUser(req.params.id);
	const valid = user.some(ticket => {
		return moment(ticket.EndTime).unix() >= moment().unix();
	});
	if (valid) {
		const validTicket = user.filter(ticket => {
			return moment(ticket.EndTime).unix() >= moment().unix();
		})[0];

		const ms = moment.duration(moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(moment(validTicket.EndTime, "DD/MM/YYYY HH:mm:ss")));
		const timeRemaining = Math.abs(Math.floor(ms.asMinutes()));
		res.status(200).json({
			isValid: valid,
			ticket: {
				_id: validTicket._id,
				User: validTicket.User,
				StartTime: validTicket.StartTime,
				remainingTime: timeRemaining,
				EndTime: validTicket.EndTime,
				Zone: validTicket.Zone
			}
		});
	} else {
		res.status(200).json({
			isValid: valid
		});
	}
});

router.get("/:id/push/", async (req, res) => {
	const user = await Users.getPushKey(req.params.id);
	res.status(200).json({ status: true, userID: req.params.id, PushKey: user });
});

router.post("/:id/push/update", async (req, res) => {
	const user = await Users.newPushKey(req.params.id, req.body.token);
	res.status(200).json({ status: true, userID: req.params.id, PushKey: user });

	Expo.SendPush(req.params.id, "Hello");
});

export default router;
