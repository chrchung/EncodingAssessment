'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('training', {
        url: '/training/:mode/:id',
        templateUrl: 'app/training/training.html',
        controller: 'TrainingCtrl'
      });
  });
