var express = require('express');
var router = express.Router();

var awskey = process.env.AWS_ACCESS_KEY_ID || '';
var awssecretkey = process.env.AWS_SECRET_ACCESS_KEY || '';
var awsregion = process.env.AWS_REGION || 'us-east-1';
var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: awskey, secretAccessKey: awssecretkey, region: awsregion});
var s3 = new AWS.S3();

//var IMAGE_TYPEFILTER = process.env.IMAGE_TYPEFILTER || '.png,.jpg';

//----------------------------------------------------------------------------
// validate the images and filter them according to prefs
//----------------------------------------------------------------------------
function filterImages(data) {
    // TODO filter based on types configured (case insensitive)
    return data;
}

//----------------------------------------------------------------------------
// loop through S3 formatted API results and build an images list
//----------------------------------------------------------------------------
function buildImagesListFromS3Data(bucketname, data) {
    const S3_PREFIX = 'https://s3.amazonaws.com/' + bucketname + '/';
    var images = [];
    var contents = data.Contents
    //console.log("iterating " + JSON.stringify(contents));
    for (var iter in contents) {
        // any validation of key can go here
        //console.log("adding " + S3_PREFIX + contents[iter].Key)
        images.push(S3_PREFIX + contents[iter].Key);
    }
    return images;
}

//----------------------------------------------------------------------------
// GET on the main page.
//----------------------------------------------------------------------------
router.get('/', function(req, res, next) {

  // TODO pull these from ENV vars + user added buckets
  var bucketIds = ['rhdj2017-selfie-out', 'rhdj2017-selfie-in', 'FakeBucket'];

  var imagesArray = [];
  var showBucket = req.query.showBucket;
  if (!showBucket) { 
    console.log('no bucket, forcing to first bucket');
    showBucket = bucketIds[0]
  }
  console.log('loading bucket: ' + showBucket);

  // for DEBUGGING
  if (showBucket === 'FakeBucket') {
    imagesArray = ['https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                 'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                 'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png',
                 'https://s3.amazonaws.com/rhdj2017-selfie-in/59bc8771815ba5440626d40d-59bc87725d92c77569d4ddc1.png'];
    res.render('index', { title: 'AWS S3 Image Viewer', showBucket: showBucket, images: JSON.stringify(imagesArray), buckets: JSON.stringify(bucketIds)});
  } else {
    // query for images
    console.log('querying S3 for objects in ' + showBucket);
    var params = {
      Bucket: showBucket
      //ContinuationToken: 'STRING_VALUE',
      //Delimiter: 'STRING_VALUE',
      //EncodingType: url,
      //FetchOwner: false,
      //MaxKeys: 50,
      //Prefix: 'STRING_VALUE',
      //RequestPayer: requester,
      //StartAfter: 'STRING_VALUE'
    };
    s3.listObjectsV2(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        res.render('index', { title: 'AWS S3 Image Viewer', showBucket: showBucket, images: JSON.stringify(imagesArray), buckets: JSON.stringify(bucketIds)});
      } else {
        //console.log(data);
        imagesArray = buildImagesListFromS3Data(showBucket, data);
        filteredImagesArray = filterImages(imagesArray);
        res.render('index', { title: 'AWS S3 Image Viewer', showBucket: showBucket, images: JSON.stringify(filteredImagesArray), buckets: JSON.stringify(bucketIds)});
      }
    });
  }
});

module.exports = router;
