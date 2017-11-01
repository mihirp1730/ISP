angular.module('starter.controllers', ['ngCordova', 'ngStorage'])

.factory('GetPlanServices', function($http){

	var token = localStorage.getItem("token");
  
  return {
   
    GetAllPlans: function(){

    return	$http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   console.log(response);
   service = response.Data;
   return service;

});


    }
  }
})
