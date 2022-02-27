var async = require('async');
var redis = require('redis');


/* Function to test database I/O */
async function makeConnection() {
	const client = redis.createClient({
		socket: {
			host: 'redisdb',
			port: 6379,
			connectTimeout: 3000
		}
	});

	client.on('connect', () => {
		console.log('Connected');
	});

	client.on('error', err => {
		console.log('Error' + err);
	});

	await client.connect();

	return client;
}

module.exports = makeConnection;
