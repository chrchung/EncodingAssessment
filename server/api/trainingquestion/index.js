'use strict';

var express = require('express');
var controller = require('./trainingquestion.controller');

var router = express.Router();

router.get('/:mode/:id', controller.getQuestion);

module.exports = router;
