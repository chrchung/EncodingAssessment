'use strict';

angular.module('encodingAssessmentApp')
  .controller('StartCtrl', function ($scope, $stateParams) {
    $scope.thisMode = $stateParams.mode;
  });
