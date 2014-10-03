angular.module('apoStatus', [])
    .factory('userStatusFactory', function($http, $q) {
        function makeUrl(firstName, lastName, callback) {
            var baseUrl = 'https://script.google.com/macros/s/AKfycbzEmAa-DxBWrImM3AGpgVsUKm7FQvPBAziDf_E4gT8/exec?sheet=Summary';
            var callbackParam = '&callback=' + callback.trim();
            return baseUrl + '&First_Name=' + firstName.trim() + '&lastName=' + lastName.trim() + callbackParam;
        }

        // service.getUserStatus = function(firstName, lastName, callback) {
        //     var deferred = $q.defer();
        //     $http({
        //             method: 'JSONP',
        //             url: makeUrl(firstName, lastName, callback)
        //         })
        //         .success(function(data) {
        //             deferred.resolve(data);
        //         })
        //         .error(function() {
        //             deferred.reject('Error retrieving status.')
        //         });
        // };

        return {
            getUserStatus: function(firstName, lastName, callback) {
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
                return deferred.promise;
            }
        };
    })
    .controller('MyController', ['$scope', 'userStatusFactory', function($scope, userStatusFactory) {

        $scope.getStatus = function() {

            $scope.hasName = !(typeof $scope.firstName == undefined || typeof $scope.lastName == undefined);
            $scope.hasStatus = $scope.hasName;

            userStatusFactory.getUserStatus($scope.firstName, $scope.lastName, 'JSON_CALLBACK')
                .then(function(data) {
                    var user = data.records[0];
                    $scope.setServiceStatus(user);
                });

            var completeMessage = "You've finished your requirement!";
            $scope.membership.statusMessage = completeMessage;
            $scope.fellowship.statusMessage = completeMessage;
        }

        $scope.setServiceStatus = function(user) {
            if (user === null) return;
            $scope.service = {
                complete: user.Service ? "Done!" : "Incomplete.",
                serviceHours: user.Service_Hours,
                largeGroup: user.Large_Group_Project ? "Done!" : "Incomplete.",
                publicity: user.Publicity ? "Done!" : "Incomplete.",
                hosting: user.Service_Hosting ? "Done!" : "Incomplete."
            }
        }

        $scope.hasName = false;
        $scope.hasStatus = false;

        $scope.service = {};
        $scope.membership = {};
        $scope.fellowship = {};

    }]);