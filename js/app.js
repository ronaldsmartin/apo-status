angular.module('apoStatus', [])
    .factory('userStatusFactory', function($http, $q) {
        function makeUrl(firstName, lastName, callback) {
            var baseUrl = 'https://script.google.com/macros/s/AKfycbzEmAa-DxBWrImM3AGpgVsUKm7FQvPBAziDf_E4gT8/exec?sheet=Summary';
            var callbackParam = '&callback=' + callback.trim();
            return baseUrl + '&First_Name=' + firstName.trim() + '&lastName=' + lastName.trim() + callbackParam;
        }

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

            userStatusFactory.getUserStatus($scope.firstName, $scope.lastName, 'JSON_CALLBACK')
                .then(function(data) {

                    var user = data.records[0];
                    $scope.hasStatus = typeof user != undefined;
                    if ($scope.hasStatus) {
                        function completionStatusString(status) {
                            return status ? 'Done!' : 'Incomplete.';
                        }
                        $scope.setServiceStatus(user, completionStatusString);
                        $scope.setMembershipStatus(user, completionStatusString);
                        $scope.setFellowshipStatus(user, completionStatusString);
                    }
                });
        }

        $scope.setServiceStatus = function(user, completionStatusString) {
            if (user === null) return;
            $scope.service = {
                complete: completionStatusString(user.Service),
                statusIcon: user.Service ? completeImageUrl : incompleteImageUrl,
                serviceHours: user.Service_Hours,
                largeGroup: completionStatusString(user.Large_Group_Project),
                publicity: completionStatusString(user.Publicity),
                hosting: completionStatusString(user.Service_Hosting)
            }
        }

        $scope.setMembershipStatus = function(user, completionStatusString) {
            if (user === null) return;
            $scope.membership = {
                complete: completionStatusString(user.Membership),
                statusIcon: user.Membership ? completeImageUrl : incompleteImageUrl,
                meetings: user.Meetings_This_Month,
                reqMeetings: user.Monthly_Required_Meetings,
                brotherComponent: completionStatusString(user.Brother_Comp),
                pledgeComponent: completionStatusString(user.Pledge_Comp)
            }
        }

        $scope.setFellowshipStatus = function(user, completionStatusString) {
            if (user === null) return;
            $scope.fellowship = {
                complete: completionStatusString(user.Fellowship),
                statusIcon: user.Fellowship ? completeImageUrl : incompleteImageUrl,
                points: user.Fellowship_Points,
                reqPoints: user.Required_Fellowship,
                hosting: completionStatusString(user.Fellowship_Hosting)
            }
        }

        var completeImageUrl = 'http://www.clker.com/cliparts/I/b/r/1/6/n/simple-green-check-button-hi.png';
        var incompleteImageUrl = 'http://www.iconsdb.com/icons/preview/soylent-red/x-mark-4-xxl.png';

        $scope.hasName = false;
        $scope.hasStatus = false;

        $scope.service = {};
        $scope.membership = {};
        $scope.fellowship = {};

    }]);