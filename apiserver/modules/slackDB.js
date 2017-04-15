'use strict';
module.exports = (function(){
    var config = require('config'),
        responseCode = config.get('responseCode'),
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

    function isExistUserName(userName) {
        var statement = 'select * from User where name=\''
            + userName
            + '\';';

        return db.query(statement);
    }

    function isExistUserEmail(userEmail){
        var statement = 'select * from User where email=\''
            + userEmail
            + '\';';

        return db.query(statement);
    }

    function getChannelsByUserId(userId){
        var statement = 'select * from Channel where id in ('
            + 'select channel_id from ChannelMember where user_id = \''
            + userId
            + '\');';

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

    return {
        init: init,
        signUp: signUp,
        signIn: signIn,
        isExistUserName: isExistUserName,
        isExistUserEmail: isExistUserEmail,
        getChannelsByUserId: getChannelsByUserId
    };
})();
