'use strict';

angular.module('encodingAssessmentApp')
  .controller('EndCtrl', function ($scope) {
    Restangular.all('api/participants/user').getList().then(function (serverJson) {
      $scope.score = serverJson.score;
    });
  });
