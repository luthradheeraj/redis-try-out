var redis = require("redis"),
    client = redis.createClient();
  
var express = require('express');
var app = express();
var expressWS = require('express-ws')(app);

function setupExpress() {
    const portNumber = 1234;

    app.listen(portNumber, function() {
        console.log(`Listening on port ${portNumber}`);
    });

    //express web socket 
    app.ws('/hello', function (websocket, request) {
        console.log('A client connected!');

        websocket.on('message', (message) => {
            console.log(`A client sent a message: ${message}`);
            if(message.type === 'set') {
                client.set(message.key, message.value, (err, val) => {
                    console.log('set: response from redis ', err, reply);
                    websocket.send({type: 'ack', err, reply, message});    
                });
            } else {
                client.get(message.key, (err, reply) => {
                    console.log('get: response from redis ', err, reply);
                    websocket.send({type: 'ack', err, reply, message});    
                });
            }
        });
    });
}

function setupRedisClient() {
    client.on("error", function (err) {
        console.log("Error " + err);
    });
}

function test() {
    //watch your redis client terminal. 
    client.set('myKey1', 'myValue1', redis.print);
    client.get('myKey1', redis.print);
}

setupRedisClient();
setupExpress();
test();