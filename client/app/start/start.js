'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('start', {
        url: '/start/:mode',
        templateUrl: 'app/start/start.html',
        controller: 'StartCtrl'
      });
  });
