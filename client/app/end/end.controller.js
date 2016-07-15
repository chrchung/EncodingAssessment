'use strict';

angular.module('encodingAssessmentApp')
  .controller('EndCtrl', function ($scope, $stateParams, Restangular, $cookies) {
    $scope.thisMode = $stateParams.mode;
    
    Restangular.all('api/participants/').get($stateParams.mode + '/user/' + $cookies.get('user')).then(function (serverJson) {
      $scope.score = serverJson.score;
    });
  });
