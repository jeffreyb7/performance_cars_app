var async = require('async');
var redis = require('redis');

var makeConnection = require('./connection.js');

/* Function to retrieve attributes */
async function getAttributes() {
	const dbConnection = await makeConnection();
	
	const allAttrs = await dbConnection.SMEMBERS('Attributes', (err, reply) => {
		if (err) throw err;
	});

	dbConnection.quit();

	return allAttrs;
};

module.exports = getAttributes;
