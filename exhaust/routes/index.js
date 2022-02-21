var express = require('express');
var router = express.Router();

var async = require('async')
var redis = require('redis');

/* Function to test database I/O */
async function testTransactions() {
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

	await client.set('foo', 'bar', (err, reply) => {
		if (err) throw err;
		console.log('Setting' + reply);
	});

	const testData = await client.get('foo', (err, reply) => {
		if (err) throw err;
		console.log('Getting' + reply);

	});

	return testData
}	

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/testdb', function(req, res) {
	testTransactions().then(function(testValue) {
		res.send(testValue);
	});
});

module.exports = router;

