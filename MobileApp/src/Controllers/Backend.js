const BackendURL = "http://quickpark.highcal.co";
const userID = "5df4ac603041f60006b07413";

async function ParkingisValid() {
	const service = await fetch(`${BackendURL}/user/${userID}/transactions/valid`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
	const response = await service.json();
	console.log(response);
	return response;
}

async function ZoneLocations() {
	const service = await fetch(`${BackendURL}/zone/all`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
	const response = await service.json();
	console.log(response);
	return response;
}

export { BackendURL, userID, ParkingisValid, ZoneLocations };
