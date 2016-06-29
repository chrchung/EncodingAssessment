'use strict';

angular.module('encodingAssessmentApp')
  .controller('MainCtrl', function ($scope, $http, Restangular) {
    $scope.taken = false;


    $scope.addParticipant = function () {
      Restangular.all('api/participants/new').post({username: $scope.username}).then(function (serverJson) {
        if (serverJson == 'name taken') {
          $scope.taken = true;
        } else {
          $state.go('training', {id : 1});
        };
      });
    };

  });
