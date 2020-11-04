const jwt = require('jsonwebtoken');
const config = require('./config');
const opn = require('opn');

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);
//console.log(token);

const rp = require('request-promise');
email = "djajafer@gmail.com";
var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
        topic: "test create meeting",
        type: 1,
        settings: {
            host_video: "true",
            participant_video: "true",
			approval_type: 0
        }
    },
    auth: {
        bearer: token
    },
    headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
};

rp(options)
    .then(function(response) {
        console.log(JSON.stringify(response));

		var result = JSON.stringify(response);
		result = JSON.parse(result);
		console.log(result.start_url);
		opn(result.start_url);

    })
    .catch(function(err) {
        // API call failed...
        console.log("API call failed, reason ", err);
    });