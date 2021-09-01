const request = require("postman-request");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3cba3f46a8589112944080df57eb6e9d&query=${latitude},${longitude}`;
  request({ url, json: true }, (err, resp, body) => {
    if (err) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location for forecasting!");
    } else {
      callback(
        null,
        `${body.current.weather_descriptions[0]}. It is currently ${
          body.current.temperature
        } degrees out. There is a ${body.current.precip * 100}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
