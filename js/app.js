angular.module('apoStatus', [])
    .controller('MyController', ['$scope', function($scope) {

        $scope.getStatus = function() {
            var completeMessage = "You've finished your requirement!";
            $scope.service.statusMessage = completeMessage;
            $scope.membership.statusMessage = completeMessage;
            $scope.fellowship.statusMessage = completeMessage;
        }

        $scope.service = {};
        $scope.membership = {};
        $scope.fellowship = {};

    }]);