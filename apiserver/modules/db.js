var mysql = require('promise-mysql'),
    config = require('config');
var slackDB;

function init(){
    mysql.createConnection({
        host: config.get('mysqlHost'),
        user: config.get('mysqlUser'),
        password: config.get('mysqlPassword'),
        database: config.get('mysqlDatabase')
    }).then(function(connection){
        slackDB = connection;
        console.log(connection);
    }, function(error){
        console.log(error);
    });
}

module.exports.init = init;