'use strict';

var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.post('/', controller.addAnswer);
router.get('/', controller.getAnswers);
router.post('/new', controller.addParticipant);

module.exports = router;
