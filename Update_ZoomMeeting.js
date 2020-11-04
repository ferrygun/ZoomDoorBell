const jwt = require('jsonwebtoken');
const config = require('./config');

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);
//console.log(token);

const rp = require('request-promise');
email = "YOUR_EMAIL_ADDR";
const meetingID = 'MEETING_ID';

var options = {    

    //** ONLY USE ONE OF THIS OPTIONS **
	//To list down the meetings
	//method: "GET",
	//uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
	//body: {
	//	"type": "live",
	//	"page_size": 30
	//},

	// To delete the meeting ID
	//method: "DELETE",
    //uri: "https://api.zoom.us/v2/meetings/" + meetingID,

	// To update the meeting ID with status 'end'
	method: "PUT",
	uri: "https://api.zoom.us/v2/meetings/" + meetingID + "/status",
	body: {
	  "action": "end"
	},
	//** 
    
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
        console.log(response);
    })
    .catch(function(err) {
        // API call failed...
        console.log("API call failed, reason ", err);
    });
