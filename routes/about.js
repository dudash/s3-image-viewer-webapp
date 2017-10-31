var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('about', { title: 'About AWS S3 Image Viewer'});
});

module.exports = router;