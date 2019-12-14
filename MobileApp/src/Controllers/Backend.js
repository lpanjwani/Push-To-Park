const BackendURL = "http://192.168.1.112:5555";
const userID = "5df4ac603041f60006b07413";

async function ParkingValid() {
  const service = await fetch(`${BackendURL}/parking/valid`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  const response = await server.json();
  return response.isValid;
}

export { BackendURL, userID, ParkingValid };
