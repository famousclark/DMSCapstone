var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
  	consumer_key:         'kRd17UV016MBkGNFdjoGy1UbD',
  	consumer_secret:      'REWLgtZsVWsuGVXvQugMWTiiL49yfTXiSVIk6mMzGuDeXXjIkt',
  	access_token:         '984582742527660032-WvPHs4LYQj7A0oax5kzVpzFbyBaGGbX',
  	access_token_secret:  'LlZloMpoX7vdli2RANNzmB4tXEWXypAQJ0x9mKc0CNTXL',
  	timeout_ms:           60*1000
  });
});

module.exports = router;
