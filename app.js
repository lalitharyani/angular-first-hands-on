//create angular module for application
angular.module('EmployeeManagement', ['ui.bootstrap']);
angular.module('EmployeeManagement').controller('HomeCtrl', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {

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

  	if($scope.newType && $scope.newType.name){
      
      // Make sure user hasn't already added this employee type
  		angular.forEach($scope.employeeTypes, function(type) {
        if($scope.newType.name === type.name) {
            match = false;
            $scope.error = true;
            $scope.error_msg = 'You have already added this Employee Type.';
            $timeout(function() {
              $scope.error = false;
              $scope.error_msg = "";
            }, 2000);
        }
      });

      // add employee item to array if already not exists
      if (match != false) {
        	$scope.employeeTypes.push($scope.newType);
        	$scope.added = true;
		      $scope.submit_msg = "Employee Type created successfully !!"
          $timeout(function() {
            $scope.added = false;
            $scope.submit_msg = "";
          }, 2000);
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
    $timeout(function() {
      $scope.removed = false;
      $scope.remove_msg = "";
    }, 2000);

  };

  
  $scope.employeeList = [];
  $scope.requestedEmployeeList = [];


  //show - hide form for Employee List
  $scope.showEmployeeList = true;
  $scope.EmployeeList = function() {
  	$scope.createEmployeeType = true;
  	$scope.deleteEmployeeType = true;
  	$scope.addNewEmployee = true;
    $scope.showEmployeeList = $scope.showEmployeeList === false ? true: false;
  };

  
  ///get employees for selected employee type from tab
  $scope.getEmployees = function(employeeType) {
    $scope.requestedEmployeeList = [];
    $scope.isDisabled = true;
    $scope.colorClass = " ";
    angular.forEach($scope.employeeList, function(employee) {
      if(employee.type === employeeType) {
        $scope.requestedEmployeeList.push(employee);
      }
    });

    $scope.requestedEmployeeList;

  };
  
  ///Disabled Edit / Remove Button default, set it to enabled once click on any employee
  $scope.isDisabled = true;
  $scope.enableActions = function(employee) {
    $scope.isDisabled = false;
    $scope.selectedEmployee = employee
    $scope.colorClass = "gray-background";

  };

  ///remove Employee from Employee List section
  $scope.removeEmployee = function(employee) {
    $scope.requestedEmployeeList.splice(employee, 1); 
    //delete from Main Employee List
    $scope.employeeList.splice(employee, 1); 
    $scope.employeeRemoved = true
    $scope.removed_msg = "Employee removed successfully !!"
    $timeout(function() {
      $scope.employeeRemoved = false;
      $scope.removed_msg = "";
    }, 2000);
    
  };

  ///edit Employee from Employee List section
  $scope.editEmployee = function(employee) {
    $scope.showEmployeeList = true;
    //show Add New Employee section and change button label
    $scope.addNewEmployee = false;
    $scope.button_label = "Update";
    $scope.heading_label = "Edit";
    //assign selected employee to newEmployee object
    $scope.newEmployee = employee;
    $scope.employeeIndex = $scope.employeeList.indexOf(employee);
    
  };


  //show - hide form for Add New Employee
  $scope.addNewEmployee = true;
  $scope.addEmployee = function() {
    $scope.newEmployee = {};
    $scope.button_label = "Add";
    $scope.heading_label = "Add";
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
	  	$scope.employeeSuccessMsg = "Employee added successfully !!"
	    $scope.newEmployee = {}
      $timeout(function() {
        $scope.employeeAdded = false;
        $scope.employeeSuccessMsg = "";
      }, 2000);
	  }

  };


  ///update Existing employee
  $scope.updateEmployee = function(old_index) {
    if($scope.newEmployee && $scope.newEmployee.name && $scope.newEmployee.designation && $scope.newEmployee.type){

      //update value on specific index
      $scope.employeeList.splice(old_index, $scope.newEmployee);
      $scope.employeeAdded = true;
      $scope.employeeSuccessMsg = "Employee updated successfully !!"
      $scope.newEmployee = {};
      $scope.button_label = "Add";
      $scope.heading_label = "Add";
      $timeout(function() {
        $scope.employeeAdded = false;
        $scope.employeeSuccessMsg = "";
      }, 2000);
    }

  };
  
  $scope.counter = 1;
  ///undo last added employee / this action can be perform for last 3 employees only.
  $scope.undo = function() {
    $scope.newEmployee = {};
  	if($scope.counter <= 3){
	    $scope.employeeList.splice(-1,1);
	    $scope.employeeUndo = true;
	    $scope.employeeUndoMsg = "Last added employee removed successfully !!"
	    $scope.employeeList;
	    $scope.counter += 1;


	  }else{
      $scope.employeeUndo = true;
      $scope.employeeUndoMsg = "You have already removed last 3 added employees."

	  }

    $timeout(function() {
      $scope.employeeUndo = false;
      $scope.employeeUndoMsg = "";
    }, 2000);
 
  };


}]);