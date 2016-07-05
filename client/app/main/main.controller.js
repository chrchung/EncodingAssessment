'use strict';

angular.module('encodingAssessmentApp')
  .controller('MainCtrl', function ($scope, $http, $state, Restangular, $cookies) {
    $scope.taken = false;


    $scope.addParticipant = function () {
      Restangular.all('api/participants/new').post({username: $scope.email}).then(function (serverJson) {
        if (serverJson == 'name taken') {
          $scope.taken = true;
        } else {
          $cookies.put('user', serverJson.username);
          $state.go('training', {id : 1});
        };
      });
    };

  });
