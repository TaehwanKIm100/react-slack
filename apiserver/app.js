var restify = require('restify'),
    config = require('config'),
    router = require('./routes/routes');

var server = restify.createServer();
router.init(server);

server.listen(config.get('serverPort'), function(){
    console.log('Server is listening at port:' + server.address().port);
});
