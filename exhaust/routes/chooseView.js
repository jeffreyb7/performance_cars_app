var express = require('express');
var router = express.Router();

var carData = require('../redis_connection/get_data.js');

/* Show attributes to explore */
router.get('/', function(req, res) {
	carData.getAttributes().then(function(data) {
        res.send(data);
    });
});

router.get('/:attribute', function(req, res) {
    carData.getRanks(req.params.attribute).then(function(data) {
        res.send(data);
    });
});

module.exports = router;
