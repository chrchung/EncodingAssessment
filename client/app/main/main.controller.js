'use strict';

angular.module('encodingAssessmentApp')
  .controller('MainCtrl', function ($scope, $http, $stateParams, $state, Restangular, $cookies) {
    $scope.taken = false;
    $scope.thisMode = $stateParams.mode;


    $scope.addParticipant = function () {
      Restangular.all('api/participants/new').post({username: $scope.email, mode: $stateParams.mode}).then(function (serverJson) {
        if (serverJson == 'name taken') {
          $scope.taken = true;
        } else {
          $cookies.put('user', serverJson.username);
          $cookies.put('score', '0');


          if ($stateParams.mode == 'grid') {
            $state.go('description', {mode : $stateParams.mode});
          } else {
            $state.go('training', {id : 1, mode: $stateParams.mode});
          }

        };
      });
    };

  });
