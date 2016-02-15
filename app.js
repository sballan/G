var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/src'));

app.use(express.static(__dirname + '/dist'));

app.use(express.static(__dirname + '/viewer'));

app.use(express.static(__dirname + '/node_modules/'));

router.get('/', function(req, res, next) {
	send.send('/index.html')
})


module.exports = router;

app.listen(3000);
console.log("Listening on port 3000...")
