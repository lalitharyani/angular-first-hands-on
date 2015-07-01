//create angular module for application
var app = angular.module('EmployeeManagement', [])


app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {

	//show - hide form for Add New Employee Type
  $scope.createEmployeeType = true;
  $scope.showCreateType = function() {
  	$scope.deleteEmployeeType = true;
  	$scope.showEmployeeList = true;
  	$scope.addNewEmployee = true;
    $scope.createEmployeeType = $scope.createEmployeeType === false ? true: false;
  };

  $scope.employeeTypes = [];
  
  //add New Employee Type
  $scope.add = function() {

  	var match = true;
  	$scope.error = false;
  	$scope.added = false;

  	if($scope.newType && $scope.newType.name){
      
      // Make sure user hasn't already added this employee type
  		angular.forEach($scope.employeeTypes, function(type) {
        if($scope.newType.name === type.name) {
            match = false;
            $scope.error = true;
            $scope.error_msg = 'You have already added this Employee Type.';
        }
      });

      // add employee item to array if already not exists
      if (match != false) {
        	$scope.employeeTypes.push($scope.newType);
        	$scope.added = true;
		      $scope.submit_msg = "Employee Type created successfully !!"
        }

	  }
	  $scope.newType = {};
	  
  	
  };

  //show - hide form for Remove Existing Employee Type
  $scope.deleteEmployeeType = true;
  $scope.showRemoveType = function() {
  	$scope.createEmployeeType = true;
  	$scope.showEmployeeList = true;
  	$scope.addNewEmployee = true;
    $scope.deleteEmployeeType = $scope.deleteEmployeeType === false ? true: false;

  };
  
  //remove Exisiting Selected Employee Type from the list
  $scope.remove = function($index) {
    $scope.employeeTypes.splice($index, 1);   
    $scope.removed = true
  	$scope.remove_msg = "Employee Type removed successfully !!"

  };

  
  $scope.employeeList = [];


  //show - hide form for Employee List
  $scope.showEmployeeList = true;
  $scope.EmployeeList = function() {
  	$scope.createEmployeeType = true;
  	$scope.deleteEmployeeType = true;
  	$scope.addNewEmployee = true;
    $scope.showEmployeeList = $scope.showEmployeeList === false ? true: false;
  };


  //show - hide form for Add New Employee
  $scope.addNewEmployee = true;
  $scope.addEmployee = function() {
  	$scope.createEmployeeType = true;
  	$scope.deleteEmployeeType = true;
  	$scope.showEmployeeList = true;
    $scope.addNewEmployee = $scope.addNewEmployee === false ? true: false;
  };
  
  
  ///add New employee
  $scope.createNewEmployee = function() {
  	if($scope.newEmployee && $scope.newEmployee.name && $scope.newEmployee.designation && $scope.newEmployee.type){
	  	$scope.employeeList.push($scope.newEmployee);
	  	$scope.employeeAdded = true;
	  	$scope.employeeUndo = false;
	  	$scope.employeeSuccessMsg = "Employee added successfully !!"
	    $scope.newEmployee = {}
	  }

  };
  
  $scope.counter = 1;
  ///undo last added employee / this action can be perform for last 3 employees only.
  $scope.undo = function() {
  	if($scope.counter <= 3){
	    $scope.employeeList.splice(-1,1);
	    $scope.employeeUndo = true;
	    $scope.employeeUndoMsg = "Last added employee removed successfully !!"
	    $scope.employeeList;

	    $scope.counter += 1;

	  }else{
     
     $scope.employeeUndoMsg = "You have already removed last 3 added employees."

	  }
 
  };





}]);