'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/questions/:id',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });
