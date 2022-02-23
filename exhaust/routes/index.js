var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Is It Fast?' });
});

router.get('/testdb', function(req, res) {
	testTransactions().then(function(testValue) {
		res.send(testValue);
	});
});

module.exports = router;

