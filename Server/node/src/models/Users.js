const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import MongoDB from "./../controllers/MongoDB";

const UserSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId,
		required: true
	},
	Balance: {
		type: Schema.Types.Number,
		required: true
	},
	Cars: [
		{
			type: Schema.Types.Number,
			required: true,
			ref: "Cars",
			minlength: 1,
			maxlength: 5
		}
	]
});
const collectionName = "Users";
const UserObject = mongoose.model(collectionName, UserSchema, collectionName);

class User {
	constructor() {}
	async NewUser(details) {
		const newUser = new UserObject(details);
		const err = await newUser.save();
		if (err) console.error(err);
		return newUser;
	}

	async GetBalance(userID) {
		const response = await UserObject.findById(userID);
		return response;
	}

	async NewParkingCharge(userID) {
		const prevState = await UserObject.findById(userID);
		if (prevState.Balance < 2) throw new Error("Balance Insufficient");
		prevState.Balance -= 2;
		const newState = await prevState.save();
		return newState;
	}
}

export default new User();
