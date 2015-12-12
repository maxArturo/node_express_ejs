var express = require('express');
var router = express.Router();
var videoData = require('../video_data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('json', {
    title: 'JSON',
    videoData: videoData,
  });
});

module.exports = router;
