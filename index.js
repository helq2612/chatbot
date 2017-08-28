'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

// const API_AI_TOKEN = "dec5ea1ba1d440a29ca5f6b814317bbc";
const API_AI_TOKEN = "09905af00ae84770b8fb973a7ea3b419";
const apiaiApp = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = "EAAbNx8o9hx8BAEIO453RXdg2U069fqNc1vwSdqAMmw5sf1tQbFqpjrLOVd9R7NcIehsZCBsT3mADmcnAcCvdwoVZBVRzRyEd7O0ZCmGSG69B7ZC8MSG6rt9KZAcDAFICQt2X9jXVilnBQHEl930FU4GIQLHCPxSQI43osAp8Y5M8fxIRzgD4I"
app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})
 

// Facebook

let token = "EAAbNx8o9hx8BAEIO453RXdg2U069fqNc1vwSdqAMmw5sf1tQbFqpjrLOVd9R7NcIehsZCBsT3mADmcnAcCvdwoVZBVRzRyEd7O0ZCmGSG69B7ZC8MSG6rt9KZAcDAFICQt2X9jXVilnBQHEl930FU4GIQLHCPxSQI43osAp8Y5M8fxIRzgD4I"
app.get('/webhook', function(req, res) {
	if(req.query['hub.verify_token'] == 'helq2612'){
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook', function(req,res) {

	console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }

})

// with apiai
function sendMessage(event){
	let sender = event.sender.id;
	let text = event.message.text;
	let apiai = apiaiApp.textRequest(text, {
		sessionId: 'tabby_cat' // use any arbitrary id
	});

	apiai.on('response', function(response){
		let aiText = response.result.fulfillment.speech;
		request({
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: {access_token: FACEBOOK_ACCESS_TOKEN},
			method: 'POST',
			json: 
			{
				recipient: {id: sender},
				message: {text: aiText}
			}
		}, 
		function (error, response) {
			if (error) {
				console.log('Error sending message: ', error);
			} else if (response.body.error) {
				console.log('Error: ', response.body.error);
			}
		});
	});
	apiai.on('error',function(error){
		console.log(error)
	});
	apiai.end();
	
}


function decideMessage(sender, text1){
	let text = text1.toLowerCase()
	if (text.includes("name")){
		sendText(sender, text)
	}
}



function sendText(sender, text){
	let messageData = {text:text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id : sender},
			message : messageData,
		}
	}, function(error, response, body){
		if(error){
			console.log("sending error!")
		}else if(response.body.error){
			console.log("response body error!")
		}
	})
}

app.listen(app.get('port'), function(){
	console.log("running: port")
})