const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const cities = [
  { name: "Yapkashnagar", distance: 60 },
  { name: "Lihaspur", distance: 50 },
  { name: "Narmis City", distance: 40 },
  { name: "Shekharvati", distance: 30 },
  { name: "Nuravgram", distance: 20 },
];

const vehicles = [
  { type: "EV Bike", range: 20, count: 2 },
  { type: "EV Car", range: 10, count: 1 },
  { type: "EV SUV", range: 30, count: 1 },
];

app.post("/search", (req, res) => {
  const cops = req.body.cops;
  const fugitiveCityIndex = Math.floor(Math.random() * 5);

  let result = "Fugitive not found";

  for (const cop of cops) {
    const chosenCity = cities.find((city) => city.name === cop.city);
    const chosenVehicle = vehicles.find(
      (vehicle) => vehicle.type === cop.vehicle
    );
    console.log(
      `Chosen city: ${chosenCity.name}, Chosen vehicle: ${chosenVehicle.type}`
    );
    const distanceToFugitive = Math.abs(
      chosenCity.distance - cities[fugitiveCityIndex].distance
    );
    console.log(
      `Distance to fugitive: ${distanceToFugitive}, Vehicle range: ${chosenVehicle.range}`
    );

    if (chosenVehicle.range >= distanceToFugitive) {
      result = `${cop.name} successfully captured the fugitive in ${cities[fugitiveCityIndex].name}`;
      break;
    }
  }

  res.json({ result });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
