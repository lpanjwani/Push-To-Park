import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class MongoDB {
  constructor() {
    this._Connect();
  }

  _Connect() {
    mongoose
      .connect("mongodb://FinTech:FinTechDemo@104.196.23.94:27017/Parking", {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: 10
      })
      .then((db, err) => {
        if (err) console.error(err);
        return db;
      })
      .catch(err => {
        // mongoose connection error will be handled here
        console.error(err);
        this._Connect();
      });
  }
}

export default new MongoDB();
