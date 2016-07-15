'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scoreboard', {
        url: '/:mode/scoreboard',
        templateUrl: 'app/scoreboard/scoreboard.html',
        controller: 'ScoreboardCtrl'
      });
  });
