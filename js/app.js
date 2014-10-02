angular.module('apoStatus', [])
    .factory('userStatusFactory', function($http, $q) {
        var service;

        function makeUrl(firstName, lastName, callback) {
            var baseUrl = 'https://script.google.com/macros/s/AKfycbzEmAa-DxBWrImM3AGpgVsUKm7FQvPBAziDf_E4gT8/exec?sheet=Summary';
            var callbackParam = '&callback=' + callback.trim();
            return baseUrl + '&First_Name=' + firstName.trim() + '&lastName=' + lastName.trim() + callbackParam;
        }

        service.getUserStatus = function(firstName, lastName, callback) {
            var deferred = $q.defer();
            $http({
                    method: 'JSONP',
                    url: makeUrl(firstName, lastName, callback)
                })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject('Error retrieving status.')
                });
        }

        return service;
    })
    .controller('MyController', ['$scope', function($scope, userStatusFactory) {

        $scope.getStatus = function() {

            $scope.hasName = !(typeof $scope.firstName == undefined || typeof $scope.lastName == undefined);
            $scope.hasStatus = $scope.hasName;



            var completeMessage = "You've finished your requirement!";
            $scope.service.statusMessage = completeMessage;
            $scope.membership.statusMessage = completeMessage;
            $scope.fellowship.statusMessage = completeMessage;
        }

        $scope.hasName = false;
        $scope.hasStatus = false;

        $scope.service = {};
        $scope.membership = {};
        $scope.fellowship = {};

    }]);