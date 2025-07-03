import axiosInstance from '../axios.js';

const getWeatherByCity = async (city) => {
	try {
		const response = await axiosInstance.get('/weather', {
			params: { q: city, units: 'metric' },
		});

		return response.data;
	} catch (e) {
		console.error(`Error fetching weather data for ${city}:`, e);
		throw new Error(e.response.data.message);
	}
};

const getForecastByCity = async (city) => {
	try {
        
		const response = await axiosInstance.get('/forecast', {
			params: { q: city, units: 'metric' },
		});

		const { list } = response.data;

		const labels = [];
		const temperatures = [];
		const humidities = [];
		const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		list.forEach((val) => {
			const time = new Date(val.dt * 1000);

			labels.push(`${time.getDate()} ${month[time.getMonth()]} ${time.getHours()}:00`);
			temperatures.push(val.main.temp);
			humidities.push(val.main.humidity);
		});

		return { labels, temperatures, humidities };
	} catch (e) {
		console.error(`Error fetching weather data for ${city}:`, e);
		throw new Error(e.response.data.message);
	}
};

export default {
	getWeatherByCity,
	getForecastByCity,
};
