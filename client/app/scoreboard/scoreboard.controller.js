'use strict';

angular.module('encodingAssessmentApp')
  .controller('ScoreboardCtrl', function ($scope, $stateParams, Restangular) {

    Restangular.all('api/participants/' + $stateParams.mode).getList().then(function (serverJson) {
        $scope.answers = serverJson;
      });

  });
