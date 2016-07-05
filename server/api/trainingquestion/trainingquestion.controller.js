'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse/node').Parse;
var session = require('express-session');
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);
Parse.serverURL = 'https://parseapi.back4app.com'


// Get list of trainingquestions
exports.getQuestion = function(req, res) {
  var Training = Parse.Object.extend('Training');
  var query = new Parse.Query(Training);

  query.equalTo('questionNumber', parseInt(req.params.id));
  query.first({
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
