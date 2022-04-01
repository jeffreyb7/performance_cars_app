var express = require('express');
var router = express.Router();
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

var carData = require('../redis_connection/get_data.js');

/* Show attributes to explore */
router.get('/', cors(corsOptions), function(req, res) {
	carData.getAttributes().then(function(data) {
    res.send(data);
    });
});

router.get('/:attribute', cors(corsOptions), function(req, res) {
  carData.getRanks(req.params.attribute).then(function(data) {
    res.send(data);
    });
});

module.exports = router;
