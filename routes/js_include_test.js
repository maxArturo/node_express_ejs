var express = require('express');
var router = express.Router();

/* GET test_test page. */
router.get('/', function(req, res, next) {
  res.render('js_include_test', {
    title: 'JS Include Test',
  });
});

module.exports = router;
