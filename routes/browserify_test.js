var express = require('express');
var router = express.Router();

/* GET test_test page. */
router.get('/', function(req, res, next) {
  res.render('browserify_test', {
    title: 'Browserify Test',
  });
});

module.exports = router;
