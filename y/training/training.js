'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('training', {
        url: '/training',
        templateUrl: '../y/training/training.html',
        controller: 'TrainingCtrl'
      });
  });