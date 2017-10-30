var express = require('express');
var router = express.Router();

var IMAGE_TYPEFILTER = process.env.IMAGE_TYPEFILTER || '.png,.jpg';

/* validate the images and filter them according to prefs */
function validateAndFilterImages(data) {
    // TODO validate URL syntax
    // TODO filter based on types configured (case insensitive)
    return data;
}

/* GET on the main page. */
router.get('/', function(req, res, next) {

  // TODO pull these from ENV vars + user added buckets
  var bucketIds = ['Bucket1', 'Bucket2', 'FakeBucket'];

  var pagedData = [];
  var showBucket = req.query.showBucket;
  if (!showBucket) { 
    console.log('no bucket, forcing to first bucket');
    showBucket = bucketIds[0]
  }
  console.log('loading bucket: ' + showBucket);

  // for debugging
  if (showBucket === 'FakeBucket') {
    pagedData = ['https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                 'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                 'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                 'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png'];
  } else {
    // TODO update pagedData from S3 for selected bucket
  }
  validatedPagedData = validateAndFilterImages(pagedData);
  res.render('index', { title: 'AWS S3 Image Viewer', showBucket: showBucket, images: JSON.stringify(validatedPagedData), buckets: JSON.stringify(bucketIds)});
});

module.exports = router;
