'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse/node').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);
Parse.serverURL = 'https://parseapi.back4app.com'


exports.addParticipant = function (req, res) {
  var Answers = Parse.Object.extend('Answers');
  var username = req.body.username;
  var mode = req.body.mode;
  var query = new Parse.Query(Answers);

  query.equalTo('username', username);
  query.equalTo('mode', mode);
  query.find({
    success: function (results) {
      if (results.length > 0) {
        res.send('name taken').end();
      } else {

        var newAnswer = new Answers();
        newAnswer.set('username', username);
        newAnswer.set('answers', []);
        newAnswer.set('mode', mode);

        newAnswer.save().then(function (result) {
            res.json(result);
          },
          function (err) {
            console.log(err);
            res.status(500).end();
          });
      };
    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });

};

exports.addAnswer = function(req, res) {
  var Answers = Parse.Object.extend('Answers');

  var query = new Parse.Query(Answers);

  query.equalTo('username',  req.body.username);
  query.equalTo('mode', req.body.mode);
  query.first({
    success: function (result) {

      if (req.body.question == "training1") {
        req.body.question = 0;
      } else if (req.body.question == "training2") {
        req.body.question = 1;
      } else {
        req.body.question = parseInt(req.body.question) + 1;
      }

      result.attributes.answers[req.body.question] = req.body.answer;

      result.set('answers', result.attributes.answers);


      result.save().then(function (result) {
          res.status(200).end();
        },
        function (err) {
          console.log(err);
          res.status(500).end();
        });

    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });


};

exports.getAnswers = function (req, res) {
  var Answers = Parse.Object.extend('Answers');
  var query = new Parse.Query(Answers);

  query.equalTo('mode', req.params.mode);
  query.descending('score');
  query.find({
    success: function (results) {
      res.json(results);
    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });
};


exports.addScore = function(req, res) {
  var Answers = Parse.Object.extend('Answers');
  var query = new Parse.Query(Answers);

  query.equalTo('username',  req.body.username);
  query.equalTo('mode', req.body.mode);
  query.first({
    success: function (result) {
      result.set('score', req.body.score);

      result.save().then(function (result) {
          res.status(200).end();
        },
        function (err) {
          console.log(err);
          res.status(500).end();
        });

    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });

};

exports.getUser = function(req, res) {
  var Answers = Parse.Object.extend('Answers');
  var query = new Parse.Query(Answers);

  query.equalTo('username',  req.params.user);
  query.equalTo('mode', req.params.mode);

  query.first({
    success: function (result) {
      res.json(result);
    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });

};
