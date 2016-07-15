'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('training', {
        url: '/:mode/training/:id',
        templateUrl: 'app/training/training.html',
        controller: 'TrainingCtrl'
      });
  });
