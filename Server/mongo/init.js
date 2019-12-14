var db = connect("mongodb://localhost/Parking");

db.createUser({
  user: "FinTech",
  pwd: "FinTechDemo",
  roles: [{ role: "dbOwner", db: "Parking" }]
});

db.Users.insert({
  _id: ObjectId("5df4ac603041f60006b07413"),
  Name: "Lavesh Panjwani",
  Balance: 10,
  Cars: [],
  PushKey: null
});
