const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage)
	} else {
		console.log(results.address);
		weather.getWeather(results.lattitude, results.longitude, (errorMessage, weatherResults) => {
				if (errorMessage) {
					console.log(errorMessage)
				} else {
					console.log(`It's currently ${ toCelcius(weatherResults.temperature) }. It feels like ${toCelcius(weatherResults.apparentTemperature)}.`);
				}
			});
	}
});