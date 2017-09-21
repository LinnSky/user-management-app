var myApp = angular.module('myApp');

myApp.controller('UsersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('UsersController loading...');

	$scope.sort = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	}

	$scope.getUsers = function(){
		$http.get('/api/users').success(function(response){
			$scope.users = response;
		});
	}

	$scope.getUser = function(){
		var id = $routeParams.id;
		$http.get('/api/users/'+id).success(function(response){
			//console.log(id);
			$scope.user = response;
		});
	}

	$scope.addUser = function(){
		$http.post('/api/users/', $scope.user).success(function(response){
			window.location.href='#/users';
		});
	}

	$scope.updateUser = function(){
		var id = $routeParams.id;
		$http.put('/api/users/'+id, $scope.user).success(function(response){
			window.location.href='#/users';
		});
	}

	$scope.removeUser = function(user){
		$http.delete('/api/users/'+user._id).success(function(response){
			console.log(response);
			if(response.status){
				$scope.error = response.message;
			}else{
				var index = $scope.users.indexOf(user);
  				$scope.users.splice(index, 1);  
			}
			//window.location.href='#/users';
		});
	}
}]);