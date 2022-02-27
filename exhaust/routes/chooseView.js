var express = require('express');
var router = express.Router();

var getAttributes = require('../redis_connection/get_data.js');

/* Show attributes to explore */
router.get('/', function(req, res) {
	getAttributes().then(function(attributes) {
		res.render('attributes');
	});
});

module.exports = router;
