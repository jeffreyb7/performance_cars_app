const express = require('express');
const router = express.Router();

/* Show attributes to explore */
router.get('/attributes', function(req, res) {
	getAttributes().then(function(attributes) {
		res.render('attributes');
	});
});
