const request = require('request');

const geocodeAddress = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);

	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

	request({
			url,
			json: true
		}, 
		(error, response, body) => {
			if (error) {
				callback('Unable to connect to Google servers.');
			} else if (body.status === 'ZERO_RESULTS') {
				callback('Unable to find that address.');
			} else if (body.status === 'OK') {
				callback(undefined, {
					address: body.results[0].formatted_address,
					lattitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				})
			}
		}
	)
}

module.exports = {
	geocodeAddress
};