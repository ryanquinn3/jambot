'use strict';

const express = require('express');
const print = console.log.bind(console);
const RtmClient = require('@slack/client').RtmClient;
const RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

// Constants
const PORT = 8080;


try {
	const keys = require('./keys.js');
} catch(e) {
	print('You must have a keys file in order for this to work. Ask Ryan.');
	process.exit(1);
}


var token = process.env.SLACK_API_TOKEN || keys.JAMBOT || keys.RQ_TEST;

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

const CHANNEL = {
	'GENERAL': 'C25QYPYG1'
};

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'\
	var dm = rtm.dataStore.getDMByName('deewhy');
	print(JSON.stringify(dm));
  	rtm.sendMessage('Tunes are coming', CHANNEL.GENERAL);
});




// App
const app = express();
app.get('/', function (req, res) {
  res.json({it: 'works'});
});

app.listen(PORT);
print('Running on http://localhost:' + PORT);