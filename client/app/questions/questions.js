'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/questions',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });