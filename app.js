var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/dependencies'));

app.use(express.static(__dirname + '/src'));

app.use(express.static(__dirname + '/dist'));

app.use(express.static(__dirname + '/viewer'));

app.use(express.static(__dirname + '/node_modules/p5/lib'));

router.get('/', function(req, res, next) {
	send.send('/index.html')
})


module.exports = router;

app.listen(3000);
