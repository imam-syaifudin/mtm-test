import WeatherService from '../services/WeatherService.js';

const getWeatherData = async (req, res) => {
	const city = req.query.city;

	if (!city) return res.status(422).json({ message: 'City is required' });

	try {
		const { name, main, weather } = await WeatherService.getWeatherByCity(city);

		res.status(200).json({
			city: name,
			temperature: main.temp,
			weather_description: weather[0].description,
			weather_conditions: weather[0].main,
			weather_icon: weather[0].icon,
			humidity: main.humidity,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getForecast = async (req, res) => {
	const city = req.query.city;

	if (!city) return res.status(422).json({ message: 'City is required' });

	try {
		const { labels, temperatures, humidities} = await WeatherService.getForecastByCity(city);

		res.status(200).json({
			labels: labels,
			temperatures: temperatures,
			humidities: humidities,
		});

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	getWeatherData,
	getForecast,
};
