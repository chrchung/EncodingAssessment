'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('end', {
        url: '/:mode/end/',
        templateUrl: 'app/end/end.html',
        controller: 'EndCtrl'
      });
  });
