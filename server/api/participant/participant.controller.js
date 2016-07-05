'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse/node').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);
Parse.serverURL = 'https://parseapi.back4app.com'


exports.addParticipant = function (req, res) {
  var Answers = Parse.Object.extend('Answers');
  var username = req.body.username;
  var query = new Parse.Query(Answers);

  query.equalTo('username', username);
  query.find({
    success: function (results) {
      if (results.length > 0) {
        res.send('name taken').end();
      } else {

        var newAnswer = new Answers();
        newAnswer.set('username', username);
        newAnswer.set('answers', []);

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
  query.first({
    success: function (result) {
      result.attributes.answers.push({question: req.body.question, answer: req.body.answer});

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

  query.descending('numAliens');
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

