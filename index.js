var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use('/static', express.static('voice-over'))
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080,function() {
  console.log("Server listening on port 8080......")
});
