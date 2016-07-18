'use strict';

angular.module('encodingAssessmentApp')
  .controller('DescriptionCtrl', function ($scope, $stateParams) {
    $scope.thisMode = $stateParams.mode;
  });
