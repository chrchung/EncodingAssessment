'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:mode',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
