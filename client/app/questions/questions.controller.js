'use strict';

angular.module('encodingAssessmentApp')
  .controller('QuestionsCtrl', function ($scope, $stateParams, $cookies, $state, Restangular) {
    $scope.question = null;
    $scope.tooMany = false;

    $scope.object1 = false;
    $scope.object2 = false;
    $scope.object3 = false;
    $scope.object4 = false;
    $scope.object5 = false;

    $scope.validate = function() {
      var count = 0;

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

      if ($scope.object5 == true) {
        count ++;
      }

      if (count != 2) {
        $scope.tooMany = true;
      } else {
        $scope.tooMany = false;
      }
    }

    $scope.next = function() {
      $scope.validate();
      if (!$scope.tooMany) {

        Restangular.all('/api/participants/').post(
          {mode: $stateParams.mode, username: $cookies.get('user'), question: $stateParams.id,  answer: [$scope.object1, $scope.object2, $scope.object3, $scope.object4, $scope.object5]}).then(
          (function (data) {
            $state.go('questions', {mode: $stateParams.mode, id: parseInt($stateParams.id) + 1});
          }), function (err) {
          });
      }
    }

    if ($stateParams.id == 10) {
      $state.go('end');
    }

    Restangular.all('api/questions/').get($stateParams.mode + '/' + $stateParams.id).then(function (serverJson) {
      $scope.question = serverJson;
    });


    $('.ui.checkbox.check1')
      .checkbox({
        onChecked: function() {
          $scope.object1 = true;
        },
        onUnchecked: function() {
          $scope.object1 = false;
        }})
    ;

    $('.ui.checkbox.check2')
      .checkbox({
        onChecked: function() {
          $scope.object2 = true;
        },
        onUnchecked: function() {
          $scope.object2 = false;
        }})
    ;

    $('.ui.checkbox.check3')
      .checkbox({
        onChecked: function() {
          $scope.object3 = true;
        },
        onUnchecked: function() {
          $scope.object3 = false;
        }})
    ;

    $('.ui.checkbox.check4')
      .checkbox({
        onChecked: function() {
          $scope.object4 = true;
        },
        onUnchecked: function() {
          $scope.object4 = false;
        }})
    ;

    $('.ui.checkbox.check5')
      .checkbox({
        onChecked: function() {
          $scope.object5 = true;
        },
        onUnchecked: function() {
          $scope.object5 = false;
        }})
    ;

    $('.bar').progress({
      percent: parseInt($stateParams.id)/10
    });

  });
