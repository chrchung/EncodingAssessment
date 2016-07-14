'use strict';

angular.module('encodingAssessmentApp')
  .controller('ScoreboardCtrl', function ($scope) {

    Restangular.all('api/participants/').getList().then(function (serverJson) {
        $scope.answers = serverJson;
      });

  });
