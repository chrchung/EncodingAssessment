'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/questions/:mode/:id',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });
