import express from 'express';
import WeatherController from '../controllers/WeatherController.js';

const router = express.Router();

router.get('/', WeatherController.getWeatherData);
router.get('/forecast', WeatherController.getForecast);

export default router;
