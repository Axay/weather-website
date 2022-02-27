const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a579b9fb507a44cae4f92cce08cfec34&query='+ latitude + ',' + longitude;
    request ({url, json: true}, (error, response) => {
        if (error) {
            callback ('Unable to connect to the weather service!', undefined);
        } else if (response.body.error) {
            callback ('Unable to find location!', undefined);
        } else {
            callback (undefined, response.body.current.weather_descriptions[0] + ' through out the day. It is currently ' + response.body.current.temperature + ' degree out. There is a ' + response.body.current.precip + '% change of rain.');
        }
    });
};

module.exports = forecast;