'use strict';

angular.module('encodingAssessmentApp')
  .controller('QuestionsCtrl', function ($scope, $stateParams, Restangular) {
    $scope.question = null;
    $scope.tooMany = false;

    $scope.validate = function() {
      var count = 0;

      if ($scope.object0 == true) {
        count ++;
      }

      if ($scope.object1 == true) {
        count ++;
      }

      if ($scope.object2 == true) {
        count ++;
      }

      if ($scope.object3 == true) {
        count ++;
      }

      if ($scope.object4 == true) {
        count ++;
      }

      if (count > 2) {
        $scope.tooMany = true;
      } else {
        $scope.tooMany = false;
      }
    }

    $scope.next = function() {
      $scope.validate();
      if (!$scope.tooMany) {

        Restangular.all('/api/questions/').post(
          {question: $stateParams.id,  answer: [$scope.object0, $scope.object1, $scope.object2, $scope.object3, $scope.object4]}).then(
          (function (data) {
            $state.go('questions', {id: parseInt($stateParams.id) + 1});
          }), function (err) {
          });
      }
    }

    if ($stateParams.id == 10) {
      $state.go('end');
    }

    Restangular.all('api/questions/').get($stateParams.id).then(function (serverJson) {
      $scope.question = serverJson.data;
    });


    $('.ui.checkbox')
      .checkbox()
    ;

    $('.bar').progress({
      percent: parseInt($stateParams.id)/10
    });

  });
