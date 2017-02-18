var restify = require('restify'),
    config = require('config'),
    pd = require('pretty-data').pd;

var server = restify.createServer();
server.listen(config.get('serverPort'), function(){
    console.log('Server is listening at port:' + server.address().port);
});
