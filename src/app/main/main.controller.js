'use strict';

angular.module('ngFlickrSearchr')
  .controller('MainCtrl', ['$scope','$http', function ($scope, $http) {

      $scope.results = [];
      $scope.isSearching = false;

      $scope.search = function() {
        $scope.searchTerm="";
        $scope.isSearching = true;

        $http({
          method: 'GET',
          url: 'https://api.flickr.com/services/rest',
          params: {
            method: 'flickr.photos.search',
            api_key: '27df85df3a8e667eb66eaa4792d6f2f1',
            text: $scope.searchTerm,
            format: 'json',
            nojsoncallback: 1
          }
        })
        .success(function(data){
            $scope.isSearching = false;

            $scope.results = data;
            console.log(data);

        }).error(function(error){
            $scope.isSearching = false;
            console.log(error);

        });
      }
  }]);

  //Flickr photo source URLs
  //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
