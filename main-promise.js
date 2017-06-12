const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const API_KEY = 'a42ce931346be3e6e07a4b15350af4bc';

function toCelcius(temp) {
	return (temp = 5/9 * (temp - 32)).toFixed(1);
}

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Addres to fetch wather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL)
.then( response => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.');
	}
	const results = response.data.results[0];
	const lat = results.geometry.location.lat;
	const lng = results.geometry.location.lng;

	const wheaterURL = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;

	console.log(results.formatted_address);
	return axios.get(wheaterURL);
})
.then( response => {
	const temperature = response.data.currently.temperature;
	const apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${toCelcius(temperature)}, it feels like ${toCelcius(apparentTemperature)}.`);
} )
.catch( e => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers.');
	} else {
		console.log(e.message);
	}
});