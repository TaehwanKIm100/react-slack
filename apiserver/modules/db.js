'use strict';
module.exports = (function(){
    var mysql = require('promise-mysql');
    var db;

    function init(host, user, password, database){
        mysql
            .createConnection({
                host: host,
                user: user,
                password: password,
                database: database
            })
            .then(function(connection){
                db = connection;
            })
            .catch(function(error){
                console.log(error);
        });
    }

    function query(statement){
        if(db) {
            return db.query(statement);
        }
    }

    return {
        init: init,
        query: query
    };
})();
