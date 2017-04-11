var config = require('config'),
    responseCode = config.get('responseCode');
    db = require('./db');

function init(){
    db.init(
        config.get('mysqlHost'),
        config.get('mysqlUser'),
        config.get('mysqlPassword'),
        config.get('mysqlDatabase')
    );
}

function signUp(name, password, email){
    var statement =
        'insert into User (name, password, email) values (\''
        + name
        + '\',\''
        + password
        + '\',\''
        + email
        +'\');';
    return db.query(statement);
}

function getChannels(){
    var statement =
        'select * from Channel';
    return db.query(statement);
}

function signIn(name, password){
    var statement =
        'select * from User where name=\''
        + name
        + '\' and password=\''
        + password
        + '\';';
    return db.query(statement);
}

module.exports.init = init;
module.exports.signIn = signIn;
module.exports.signUp = signUp;
module.exports.getChannels = getChannels;