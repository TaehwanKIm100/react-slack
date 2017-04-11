var restify = require('restify'),
    config = require('config'),
    responseCode = config.get('responseCode'),
    router = require('./routes/routes');

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(function(req, res, next){
    try {
        req.body = JSON.parse(req.body);
        next();
    }
    catch (e) {
        console.log(e);
        res.send(responseCode.BAD_REQUEST, {
            error: {
                message: "JSON PARSE ERROR"
            }
        });
    }
});

router.init(server);

server.listen(config.get('serverPort'), function(){
    console.log('Server is listening at port:' + server.address().port);
});
