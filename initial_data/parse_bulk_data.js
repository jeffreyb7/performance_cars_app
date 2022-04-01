const fs = require('fs');

const bulkData = fs.readFileSync('./data.csv', 'utf8', (err) => {
	if (err) {
		console.error(err);
		return;
	};
});


const carData = bulkData.split('\n');
const categoryNames = carData[0].split(',');
const dataNoHeaders = carData.slice(1, -1);
const carMakes = new Set();

// Create a set of attributes
for (let x in categoryNames) {
	
	let attr = categoryNames[x];

	if (attr == 'Make' || attr == 'Model') {
		continue;
	}
	else {
		let attrOutput = `*3\r\n$4\r\nSADD\r\n$10\r\nAttributes\r\n$${attr.length}\r\n${attr}\r\n`
		fs.appendFileSync('./data_as_protocol.txt', attrOutput, (err) => {
			if (err) {
				console.error(err);
				return;
			};
		});
	}
};

// Create sorted set of car values for each attribute 
for (let x in dataNoHeaders) {
    
	let modelParams = dataNoHeaders[x].split(',');
    carMakes.add(modelParams[0]);

	for (let i = 2; i < categoryNames.length; i++) {

    let modelName = modelParams[1];
    let category = categoryNames[i];
    let modelValue = modelParams[i];

    let dataOutput = `*4\r\n$4\r\nZADD\r\n$${category.length}\r\n${category}\r\n$${modelValue.length}\r\n${modelValue}\r\n$${modelName.length}\r\n${modelName}\r\n`;
    fs.appendFileSync('./data_as_protocol.txt', dataOutput, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
	};
};

// Create a set of unique makes available
carMakes.forEach (function(value) {
  let makeOutput = `*3\r\n$4\r\nSADD\r\n$5\r\nMakes\r\n$${value.length}\r\n${value}\r\n`;
  fs.appendFileSync('./data_as_protocol.txt', makeOutput, (err) => {
    if (err) {
      console.error(err);
      return;
    };
  });
});


