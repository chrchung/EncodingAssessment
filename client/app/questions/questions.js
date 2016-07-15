'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/:mode/questions/:id',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });
