var sampleApp = angular.module('NewApp', ['ui.router'])

/* route start*/
sampleApp.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, send to /index
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"
    })
    .state('modify', {
      url: "/home/:id",
      templateUrl: "templates/home.html",
      controller: "HomeController"
    })
    .state('verification', {
      url: "/verification",
      templateUrl: "templates/verification.html",
      controller: "VerificationController"
    });
}]);

/* route end*/


/* Controller start*/

sampleApp.controller('HomeController', [
'$scope',
'$location',
'$http',
'$state',
'$stateParams',
function($scope, $location, $http, $state, $stateParams){
$scope.incomplete = false;  
$scope.username ='';
$scope.category= '';
$scope.confirmCheck = false;
$scope.clearSession = false;
$scope.getCategories =function() {
    $http.get('/categories').success(function(data){
      $scope.categories = data;

      if ($stateParams.id)
        {
         // $scope.clearSession = true;
          $http.get('/getsession').success(function(data){
              $scope.username = data.username;
              $scope.category = data.category;
              $scope.confirmCheck = data.isCheck;
              
              
            });
        }
    });
  };


$scope.getCategories();





$scope.login =function() {
  var username = $scope.username;
  var category = $scope.category;
  var isCheck = $scope.confirmCheck;
  
  $http.post('/login', {username:username,category:category, isCheck: isCheck}).
    success(function(data, status, headers, config) {
      if(data==='done') 
         $state.go("verification");
     }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


  };



$scope.$watch('username',function() {$scope.test();});
$scope.$watch('category',function() {$scope.test();});


$scope.test = function() {
	$scope.incomplete = false;   
    if ((!$scope.username.length || !$scope.category.length)) {
        $scope.incomplete = true;
    }
};

$scope.process = function(path) {
   var loginresponse = $scope.login();
  };

}])
.controller('VerificationController', [
'$scope',
'$http',
'$location',
'$state',
'$stateParams',
function($scope, $http, $location, $state, $stateParams){

$scope.username = '';
$scope.category = '';
$scope.confirmCheck = false;


$http.get('/getsession').success(function(data){
      $scope.username = data.username;
      $scope.category = data.category;

      $scope.confirmCheck = data.isCheck;
    });

$scope.modify = function()
                {
                  $state.go("modify", { id: 'modify' });
                };


}]);

/* Controller start*/




