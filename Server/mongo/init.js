var db = connect("mongodb://localhost/Parking");

db.createUser({
	user: "FinTech",
	pwd: "FinTechDemo",
	roles: [{ role: "dbOwner", db: "Parking" }]
});

db.Users.insert({
	_id: ObjectId("5df4ac603041f60006b07413"),
	Name: "Lavesh Panjwani",
	Balance: 20,
	Cars: [],
	PushKey: null
});

db.Zones.insert([
	{
		location: { type: "Point", coordinates: [25.1034, 55.1643], radius: 800 },
		Zone: "382F"
	},
	{
		location: { type: "Point", coordinates: [25.290592, 55.380705], radius: 980 },
		Zone: "273C"
	}
]);
