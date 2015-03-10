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
            method: 'flickr.photos.getRecent',
            api_key: '27df85df3a8e667eb66eaa4792d6f2f1',
            text: $scope.searchTerm,
            format: 'json',
            nojsoncallback: 1
          }
        })
        .success(function(data){
            $scope.isSearching = false;

            //Flickr photo source URLs
            //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
            
            angular.forEach(data.photos.photo,function(value,key){
              value.imageSrc = "https://farm"+value.farm+".staticflickr.com/"+value.server+"/"+value.id+"_"+value.secret+"_b.jpg";
            })

            $scope.results = data;

        }).error(function(error){
            $scope.isSearching = false;
            alert(error);
        });
      }
  }]);
