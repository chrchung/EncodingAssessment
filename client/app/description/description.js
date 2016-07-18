'use strict';

angular.module('encodingAssessmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('description', {
        url: '/:mode/description',
        templateUrl: 'app/description/description.html',
        controller: 'DescriptionCtrl'
      });
  });
