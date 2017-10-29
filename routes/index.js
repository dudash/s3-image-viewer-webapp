var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AWS S3 Image Viewer', imageName: 'Dummy Image' });
});

module.exports = router;
