var async = require('async');
var redis = require('redis');

var makeConnection = require('./connection.js');

/* Function to retrieve attributes */
async function getAttributes() {
	const dbConnection = await makeConnection();
	
	const allAttrs = await dbConnection.SMEMBERS('Attributes', (err, reply) => {
		if (err) throw err;
	});

	await dbConnection.quit();

    const attrPacket = {'data': {'Attributes': allAttrs}} 

	return attrPacket;
};

/* Function to retrieve makes */
async function getMakes() {
	const dbConnection = await makeConnection();
	
	const allMakes = await dbConnection.SMEMBERS('Makes', (err, reply) => {
		if (err) throw err;
	});

	await dbConnection.quit();

    const makePacket = {'data': {'Makes': allMakes}} 

	return makePacket;
};

async function getRanks(attribute) {
    const dbConnection = await makeConnection();
    
    /* The following command does not work:
        dbConnection.ZRANGE(attribute, 0, -1, {WITHSCORES: true})
    This is why I'm using sendCommand
    Consider submitting this to node-redis as an issue?
    */
    const rawRanks = await dbConnection.sendCommand(['ZRANGE', attribute, 0, -1, 'WITHSCORES'], (err, reply) => {
        if (err) throw err;
    });

    await dbConnection.quit();

    const stdRanks = {'data': {'models': [], 'values': []}}; 
    
    while (rawRanks.length > 0) {
        let rankPair = rawRanks.splice(0, 2);
        let carModel = rankPair[0].replace(/_/g, ' ');
        let carValue = parseFloat(rankPair[1]);
        stdRanks.data.models.push(carModel);
        stdRanks.data.values.push(carValue);
    };
    
    return stdRanks;
};

module.exports = {
    getAttributes,
    getMakes,
    getRanks
};
