var express = require('express');
var router = express.Router();

var IMAGE_TYPEFILTER = process.env.IMAGE_TYPEFILTER || '.png,.jpg';

/* validate the images and filter them according to prefs */
function validateAndFilterImages(data) {
    // validate URL syntax
    // filter based on types listed (case insensitive)
    return [];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var bucketIds = ['Bucket1', 'Bucket2', 'AnotherBucket'];  // TODO pull these from ENV + user input
  var pagedData = ['https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                    'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                    'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                    'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png'];
  validatedPagedData = validateAndFilterImages(pagedData);
  res.render('index', { title: 'AWS S3 Image Viewer', images: JSON.stringify(validatedPagedData), buckets: JSON.stringify(bucketIds)});
});

module.exports = router;
