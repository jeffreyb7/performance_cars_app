const fs = require('fs');

const bulkData = fs.readFileSync('./data.csv', 'utf8', (err) => {
	if (err) {
		console.error(err);
		return;
	};
});


const carData = bulkData.split('\n');
const categoryNames = carData[0].split(',');
const dataNoHeaders = carData.slice(1, -2);

/* Create a set of attributes */
for (let x in categoryNames) {
	
	let attr = categoryNames[x];

	if (attr == 'Make' || attr == 'Model') {
		continue;
	}
	else {
		let attrOutput = `*3\r\n$4\r\nSADD\r\n$10\r\n$Attributes\r\n$${attr.length}\r\n${attr}`
		fs.appendFileSync('./data_as_protocol.txt', attrOutput, (err) => {
			if (err) {
				console.error(err);
				return;
			};
		});
	};
});

/* Create sorted set of cars for each attribute */
for (let x in dataNoHeaders) {

	let modelParams = dataNoHeaders[x].split(',');
	if (x > 0) {
		let current_make = modelParams[x];
		let previous_make = modelParams[x-1];
		if (current_make != previous_make) {
			let makeOutput = `*3\r\n$4\r\nSADD\r\n$5\r\n$Makes\r\n$${current_make.length}\r\n${current_make}`;
			fs.appendFileSync('./data_as_protocol.txt', makeOutput, (err) => {
				if (err) {
					console.error(err);
					return;
				};
			});
		};
	};

	for (let i = 0; i < categoryNames.length; i++) {

		if (i < 2) {
			continue;
		}
		else {
			let modelName = modelParams[0];
			let category = categoryNames[i];
			let modelValue = modelParams[i];

			let dataOutput = `*4\r\n$4\r\nZADD\r\n$${category.length}\r\n${category}\r\n$${modelValue.length}\r\n${modelValue}\r\n$${modelName.length}\r\n${modelName}\r\n`;
			fs.appendFileSync('./data_as_protocol.txt', dataOutput, (err) => {
				if (err) {
					console.error(err);
					return;
				};
			});
		};
	};
};




