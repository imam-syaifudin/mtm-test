import express from "express";
import "dotenv/config";
import axiosInstance from "./axios.js";
import cors from 'cors';

const app = express();
const port = process.env.port || 8000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(422).json({ message: "City is required" });
  }

  try {
    const response = await axiosInstance.get("/weather", {
      params: {
        q: city,
        units: "metric",
      },
    });

    const { name, main, weather } = response.data;

    res.status(200).json({
      city: name,
      temperature: main.temp,
      weather_description: weather[0].description,
      weather_conditions: weather[0].main,
      weather_icon: weather[0].icon,
      humidity: main.humidity,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/forecast", async (req, res) => {
    const city = req.query.city;
  
    if (!city) {
      return res.status(422).json({ message: "City is required" });
    }
  
    try {

      const response = await axiosInstance.get("/forecast", {
        params: {
          q: city,
          units: "metric",
        },
      });
  
      const { list } = response.data;

      const labels = [];
      const temperatures = [];
      const humidities = [];
      const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

      list.forEach(val => {

        const time = new Date(val.dt * 1000);

        labels.push(`${time.getDate()} ${month[time.getMonth()]} ${time.getHours()}:00`);
        temperatures.push(val.main.temp);
        humidities.push(val.main.humidity);
      })
  
      res.status(200).json({
        labels: labels,
        temperatures: temperatures,
        humidities: humidities,
      });

    } catch (error) {
      if (error.response && error.response.status === 404) {
        return res.status(404).json({ message: "City not found" });
      }
  
      res.status(500).json({ message: "Internal server error" });
    }
  });

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
