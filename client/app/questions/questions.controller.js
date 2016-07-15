'use strict';

angular.module('encodingAssessmentApp')
  .controller('QuestionsCtrl', function ($scope, $stateParams, $cookies, $state, Restangular) {
    $scope.mode = $stateParams.mode;

    $scope.question = null;
    $scope.tooMany = false;

    $scope.object1 = false;
    $scope.object2 = false;
    $scope.object3 = false;
    $scope.object4 = false;
    $scope.object5 = false;


    var scores = {1 : {1:[[3, 5], [2, 3], [1, 3], [2, 4], [1, 2], [2, 5], [1, 5], [1, 4], [4, 5]],
      2:[[3, 4]]},
      2: {1:[[3, 5], [2, 5], [1, 5], [4, 5]],
        2:[[2, 3]],
        3:[[1, 3], [2, 4], [1, 2]],
        4:[[1, 4]],
        5:[[3, 4]]},
      3 : {1:[[3, 4], [2, 4], [1, 4], [4, 5]],
        2:[[3, 5], [2, 3], [1, 3], [2, 5], [1, 5]],
        3:[[1, 2]]},
      4 : {1:[[3, 4], [3, 5], [2, 3], [1, 3], [2, 4], [1, 2], [2, 5], [1, 4], [4, 5]],
        2:[[1, 5]]},
      5 : {1:[[3, 5], [2, 5], [1, 5], [4, 5]],
        2:[[2, 4]],
        3:[[3, 4]],
        4:[[1, 2]],
        5:[[1, 3]],
        6:[[1, 4]],
        7:[[2, 3]]},
      6 : {1:[[3, 4], [2, 4], [4, 5]],
        2:[[1, 4]],
        3:[[2, 3], [2, 5]],
        4:[[1, 2]],
        5:[[1, 3], [1, 5]],
        6:[[3, 5]]},
      7 : {1:[[3, 5], [2, 5], [1, 5], [4, 5]],
        2:[[3, 4], [2, 3], [1, 3]],
        3:[[1, 2], [1, 4]],
        4:[[2, 4]]},
      8 : {1:[[3, 4], [2, 4], [1, 4], [4, 5]],
        2:[[2, 3], [1, 3]],
        3:[[3, 5]],
        4:[[1, 2]],
        5:[[1, 5]],
        6:[[2, 5]]},
      9 : {1:[[3, 4], [3, 5], [1, 3], [2, 4], [1, 2], [2, 5]],
        2:[[1, 5], [1, 4]],
        3:[[2, 3]],
        4:[[4, 5]]}
    };

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
    };

    $scope.next = function() {
      $scope.validate();
      if (!$scope.tooMany) {
        // calculateScore();
        Restangular.all('/api/participants/').post(
          {mode: $stateParams.mode, username: $cookies.get('user'), question: $stateParams.id,  answer: [$scope.object1, $scope.object2, $scope.object3, $scope.object4, $scope.object5]}).then(
          (function (data) {
            $state.go('questions', {mode: $stateParams.mode, id: parseInt($stateParams.id) + 1});
          }), function (err) {
          });
      }
    };

    var parseAns = function(answer) {
      var res = [];

      var i;
      for (i = 0; i < answer.length; i ++) {
        if (answer[i] == true && res.length < 2) {
          res.push(i + 1);
        }
      }
      return res;
    };

    var arraysEqual = function(arr1, arr2) {
      if(arr1.length !== arr2.length)
        return false;
      for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
          return false;
      }

      return true;
    };

    var calculateScore = function()  {
      var total = 0;


      Restangular.all('api/participants/').get($stateParams.mode + '/user/' + $cookies.get('user')).then(function (serverJson) {
        var answers = serverJson.answers;

        var k;
        for (k = 0; k < answers.length - 2; k++) {
          var thisQuestionScores = scores[k + 1];
          var answer = parseAns(answers[k + 2]);
          var score = null;


          for (var key in thisQuestionScores) {
            var i;
            for (i = 0; i < thisQuestionScores[key].length; i++) {
              if (arraysEqual(thisQuestionScores[key][i], answer)) {
                score = key;
                break;
              }
            }
          }

          total += parseInt(score);
        }


        Restangular.all('/api/participants/score').post(
          {mode: $stateParams.mode, username: $cookies.get('user'), score: total}).then(
          (function (data) {
            $state.go('end', {mode: $stateParams.mode});
          }), function (err) {
          });

      });
    };


    if ($stateParams.id == 10) {

      calculateScore();


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

    $('#prog').progress({
      percent: parseInt($stateParams.id)/10 * 100
    });

  });
