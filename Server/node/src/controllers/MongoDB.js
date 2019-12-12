import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class MongoDB {
	constructor() {
		this._Connect();
	}

	_Connect() {
		mongoose.connect(process.env.MongoDB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then((db, err) => {
			if (err) console.error(err);
			return db;
		});
	}
}

export default new MongoDB();
