'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse/node').Parse;
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);
Parse.serverURL = 'https://parseapi.back4app.com'



exports.getQuestion = function(req, res) {
  var Questions = Parse.Object.extend('Questions');
  var query = new Parse.Query(Questions);

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
