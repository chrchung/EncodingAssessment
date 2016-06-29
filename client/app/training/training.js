'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('training', {
        url: '/training/:id',
        templateUrl: 'app/training/training.html',
        controller: 'TrainingCtrl'
      });
  });
