const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import MongoDB from "../controllers/MongoDB";

const ZonesSchema = new Schema({
	Zone: {
		type: Schema.Types.String,
		minlength: 4,
		maxlength: 4
	}
});
ZonesSchema.index({ location: "2dsphere" });
const collectionName = "Zones";
const ZonesObject = mongoose.model(collectionName, ZonesSchema, collectionName);

class Zones {
	constructor() {}
	async Find(coordinates, maxDistance) {
		const zones = await ZonesObject.find({
			location: {
				$near: {
					$maxDistance: maxDistance,
					$geometry: {
						type: "Point",
						coordinates: coordinates
					}
				}
			}
		});
		return zones;
	}
}

export default new Zones();
