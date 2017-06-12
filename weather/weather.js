const request = require('request');
const API_KEY = 'a42ce931346be3e6e07a4b15350af4bc';

const getWeather = (lat, lon, callback) => {

	request({
		url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature	
			});
		} else {
			callback('Unable to fetch weather.');
		}
		
	});

}

module.exports.getWeather = getWeather;