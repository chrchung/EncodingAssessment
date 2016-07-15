'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('start', {
        url: '/:mode/start',
        templateUrl: 'app/start/start.html',
        controller: 'StartCtrl'
      });
  });
