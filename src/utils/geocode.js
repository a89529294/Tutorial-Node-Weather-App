const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYTg5NTI5Mjk0IiwiYSI6ImNrYWkwamtzZzA2MnMyc3BmazF4aDQ0eGsifQ.BXgjUwdL2i7_EYkFkKqgCA&limit=1`;

  request({ url, json: true }, (err, resp, body) => {
    if (err) callback("Unable to connect to location services!");
    else if (body.features?.length === 0)
      callback("Unable to find location for geocoding!");
    else
      callback(null, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
  });
};

module.exports = geocode;
