var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var bucketIds = ['Bucket1', 'Bucket2', 'AnotherBucket'];  // TODO pull these from ENV + user input
  var pagedData = ['XXXX', 'YYYY', 'ZZZZ', 'AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG'];
  res.render('index', { title: 'AWS S3 Image Viewer', images: JSON.stringify(pagedData), buckets: JSON.stringify(bucketIds)});
});

module.exports = router;
