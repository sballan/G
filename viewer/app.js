var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/viewer'));

router.get('/', function() {
	send.send('/index.html')
})


module.exports = router;

app.listen(3000);
