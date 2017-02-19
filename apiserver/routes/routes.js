var db = require('../modules/db');

function init(server){

    db.init();

    server.get('/', function(req, res){
        res.send(200);
    });
};

module.exports.init = init;