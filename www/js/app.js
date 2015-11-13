// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }
});
})

.controller("feedCtrl", function($http, $scope){
  $scope.init = function(){
    $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "num":"8", "q": "http://feeds.feedburner.com/prawitorss" } })
    .success(function(data) {
      $scope.rssTitle = data.responseData.feed.title;
      $scope.rssUrl = data.responseData.feed.feedUrl;
      $scope.rssSiteUrl = data.responseData.feed.link;
      $scope.entries = data.responseData.feed.entries;
      window.localStorage["entries"] = JSON.stringify(data.responseData.entries);
    })
    .error(function(data) {
      console.log("ERROR: " + data);
      if (window.localStorage["entries"] !== undifined) {
        $scope.entries = JSON.parse(window.localStorage["entries"]);
      }
    });
  }

  $scope.browse = function(v){
    window.open(v, "_system", "location=yes")
  }
});