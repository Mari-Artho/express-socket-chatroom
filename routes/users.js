var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //add css
  let htmlHead = `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/stylesheets/style.css">`

  let borrow = `
    <body style="background-color:#e9bdaf;">
    <div style="text-align:center; font:Helvetica; padding:30px; height:50px;">
    <h1>This is Tanpopo chat room</h1>
    </div>
    </body>
  `
  res.send(htmlHead + borrow);

});


module.exports = router;

