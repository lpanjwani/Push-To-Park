const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import MongoDB from "./../controllers/MongoDB";

const TicketSchema = new Schema({
	StartTime: {
		type: Schema.Types.Date,
		default: Schema.Types.Date.now,
		required: true
	},
	EndTime: {
		type: Schema.Types.Date,
		required: true
	},
	User: {
		ID: {
			type: Schema.Types.String,
			required: true,
			ref: "Users"
		},
		Car: {
			type: Schema.Types.Number,
			required: true,
			ref: "Cars",
			minlength: 1,
			maxlength: 5
		}
	},
	Zone: {
		type: Schema.Types.String,
		required: true,
		ref: "Zones",
		minlength: 4,
		maxlength: 4
	}
});
const collectionName = "Tickets";
const TicketObject = mongoose.model(collectionName, TicketSchema, collectionName);

class Ticket {
	constructor() {}
	async NewTicket(details) {
		const ParkingTicket = new TicketObject(details);
		const err = await ParkingTicket.save();
		return err;
	}

	async GetTicketForUser(userID) {
		const userTickets = await TicketObject.find({
			"User.ID": userID
		}).exec();
		return userTickets;
	}
}

export default new Ticket();
