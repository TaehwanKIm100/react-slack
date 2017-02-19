function init(server){
    server.get('/', function(req, res){
        res.send(200);
    });
};

module.exports.init = init;