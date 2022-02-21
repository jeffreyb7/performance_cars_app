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

for (let x in dataNoHeaders) {

	let modelParams = dataNoHeaders[x].split(',');

	for (let i = 0; i < categoryNames.length; i++) {

		if (i == 0) {
			continue;
		}
		else {
			let modelName = modelParams[0]
			let modelNameLength = modelName.length

			let category = categoryNames[i];
			let categoryLength = category.length;
			
			let modelValue = modelParams[i];
			let modelValueLength = modelValue.length;

			let dataOutput = `*4\r\n$4\r\nZADD\r\n$${categoryLength}\r\n${category}\r\n$${modelValueLength}\r\n${modelValue}\r\n$${modelNameLength}\r\n${modelName}\r\n`

			fs.appendFileSync('./new_bulk_data.csv', dataOutput, (err) => {
				if (err) {
					console.error(err);
					return;
				};
			});
		};
	};
};




