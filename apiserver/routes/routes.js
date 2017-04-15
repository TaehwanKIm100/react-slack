'use strict';
module.exports = (function(){
    var pd = require('pretty-data').pd;
    var responseCode = require('config').get('responseCode');
    var slackDB = require('../modules/slackDB');

    function init(server){

        slackDB.init();

        //sign in logic
        server.post('/signIn', function(req, res){
            var name = req.body.name,
                password = req.body.password;

            if (name && password) {
                slackDB
                    .signIn(name, password)
                    .then(function(rows){
                        console.log(pd.json(rows));
                        if (rows.length === 1) {
                            res.send(responseCode.NO_CONTENT);
                        } else if (rows.length === 0) {
                            res.send(responseCode.NOT_FOUND);
                        } else {
                            res.send(responseCode.INTERNAL_SERVER_ERROR);
                        }

                    })
                    .catch(function(error){
                        console.log(error);
                        res.send(responseCode.INTERNAL_SERVER_ERROR);
                    });
            } else {
                res.send(responseCode.BAD_REQUEST, {
                    error: {
                        message: "PARAMETER NAME MATCH ERROR"
                    }
                });
            }
        });

        //sign up logic
        server.post('/signUp', function(req, res){
            var name = req.body.name,
                password = req.body.password,
                email = req.body.email;

            if (name && password && email) {
                slackDB
                    .signUp(name, password, email)
                    .then(function(){
                        res.send(responseCode.CREATED);
                    })
                    .catch(function(error){
                        console.log(pd.json(error));
                        if (error.errno === 1062) {
                            res.send(responseCode.DUPLICATED, {
                                error: {
                                    message: "DUPLICATED NAME OR EMAIL"
                                }
                            });
                        } else {
                            res.send(responseCode.INTERNAL_SERVER_ERROR);
                        }
                    });
            } else {
                res.send(responseCode.BAD_REQUEST, {
                    error: {
                        message: "PARAMETER NOT MATCH"
                    }
                });
            }
        });

        // returns channel list
        server.get('/channels', function(req, res){
            var userId = req.body.userId;
            slackDB
                .getChannelsByUserId(userId)
                .then(function(rows){
                    console.log(rows);
                    res.send(responseCode.OK);
                })
                .catch(function(error){
                    console.log(error);
                    res.send(responseCode.INTERNAL_SERVER_ERROR);
                });
        });

        server.post('/channels', function(req, res){

        });

        server.get('/channels/:channelId/articles', function(req, res){

        });

        server.post('/channels/:channelId/articles', function(req, res){

        });
    }

    return {
        init: init
    }
})();

