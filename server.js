const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path"); // Add this line

const apiKey = "518713121248ec0d62252e3d98096735";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

projectData = {};

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "website", "index.html"));
});

app.post("/getData", async (req, res) => {
  const zipCode = req.body.zipCodeValue;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);

    const data = response.data;

    projectData = data;

    console.log(projectData);
    res.send(projectData);
  } catch (error) {
    console.error("Error fetching data from OpenWeatherMap:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
