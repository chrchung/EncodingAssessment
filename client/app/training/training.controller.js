'use strict';

angular.module('encodingAssessmentApp')
  .controller('TrainingCtrl', function ($scope, $state, $stateParams, Restangular) {

    if ($stateParams.id == 3) {
      $state.go('questions', {id : 1});
    }
    
    
    
    
  });
