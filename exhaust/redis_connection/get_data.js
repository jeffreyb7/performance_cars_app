var async = require('async')
var redis = require('redis')

var db = require('./connection.js')

/* Function to retrieve attributes */
async function getAttributes() {
	const dbConnection = db.makeConnection();
	
	const allAttrs = await dbConnection.LRANGE('Attributes', 0, -1, (err, reply) => {
		if (err) throw err;
	});

	dbConnection.quit();

	return allAttrs;
}

module.exports = getAttributes;
