/**
 * HTML5 Playground
 * File:	storage.js
 * Author:	Nagendra U M
 */

// global variable to hold DB reference
var db;

function thingsToDoOnload() {
	retrieveTodoList(); 
	retrieveScratchpad();
	
	db = openDatabase("MyDB", "1.0", "HTML5 Web SQL Database API Demo", 200000);
	
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Employee", [], function(tx, result) {
			// success - table exists
			$('#createEmpTableButton').hide();
			populateEmployeeTable();
		}, function(e) {
			// failure - table does not exist
			$('#employeeDetailsForm').hide();
			$('#employeeTable').hide();
			$('#addEmployeeButton').hide();
			$('#dropEmpTableButton').hide();
		});
	});
	
	window.addEventListener("offline", function(e) {
		console.log("ALERT !! You just went OFFLINE !!");
		showNotification("ALERT !! You just went OFFLINE !!");
	});
	
	window.addEventListener("online", function(e) {
		console.log("ALERT !! You are back ONLINE !!");
		showNotification("ALERT !! You are back ONLINE !!");
	});
}

function persistTodoList() {
	localStorage.setItem('todoList', document.getElementById('lines').innerHTML);
	showNotification('Changes stored in localStorage successfully.');
}

function retrieveTodoList() {
	var edit = document.getElementById('lines');
	if(localStorage.getItem('todoList')) {
		edit.innerHTML = localStorage.getItem('todoList');
		showNotification('Data from localStorage retrieved successfully.');
	}
}

function persistScratchpad() {
	sessionStorage.setItem('scratchPad', document.getElementById('scratchpad').innerHTML);
	showNotification('Changes stored in sessionStorage successfully.');
}

function retrieveScratchpad() {
	var edit = document.getElementById('scratchpad');
	if(sessionStorage.getItem('scratchPad')) {
		edit.innerHTML = sessionStorage.getItem('scratchPad');
		showNotification('Data from sessionStorage retrieved successfully.');
	}
}

function dbErrorhandler(e) {
	showNotification("Error accessing database instance. Check console logs for more details.");
	console.log("Error accessing database instance: ", e);
}

function createEmployeeTable() {
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE Employee (empId REAL UNIQUE, empName TEXT, empSalary REAL)",
				[], function(tx) {
					showNotification('Table myDB.EMPLOYEE created successfully.');
					$('#employeeDetailsForm').show();
					$('#employeeTable').show();
					$('#addEmployeeButton').show();
					$('#dropEmpTableButton').show();
					$('#createEmpTableButton').hide();
				}, dbErrorhandler);
	});
}

function addEmployee() {
	var id = $('#empId').val();
	var name = $('#empName').val();
	var salary = $('#empSalary').val();
	
	console.log('Trying to insert (' + id + ", " + name + ", " + salary + ") into EMPLOYEE table...");
	

	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO Employee (empId, empName, empSalary) VALUES (?, ?, ?)", [ id, name, salary ], function(tx, result) {
			console.log('Successfully inserted tuple (' + id + ', ' + name + ', ' + salary + ') into EMPLOYEE table...');
			populateEmployeeTable();
			// clear input fields
			$('#empId').val('');
			$('#empName').val('');
			$('#empSalary').val('');
		}, dbErrorhandler);
	});
}

function populateEmployeeTable() {
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Employee", [], function(tx, result) {
			// empty contents of table
			document.getElementById('employeeTable').innerHTML = '<tr>' + 
				'<th class="employeeTableHeader">Employee ID</th>' +
				'<th class="employeeTableHeader">Employee Name</th>' + 
				'<th class="employeeTableHeader">Salary</th>' +
				'</tr>';
			
			for (var i = 0, item = null; i < result.rows.length; i++) {
				item = result.rows.item(i);
				document.getElementById('employeeTable').innerHTML += '<tr>' +
					'<td class="employeeTableData">' + item['empId'] + '</td>' +
					'<td class="employeeTableData">' + item['empName'] + '</td>' +
					'<td class="employeeTableData">' + item['empSalary'] + '</td>' +
					'</tr>';
			}
		});
	});
}

function dropEmployeeTable() {
	db.transaction(function(tx) {
		tx.executeSql("DROP TABLE Employee", [], function(tx) {
			showNotification('Table myDB.EMPLOYEE dropped successfully.');
			$('#employeeDetailsForm').hide();
			$('#employeeTable').hide();
			$('#addEmployeeButton').hide();
			$('#dropEmpTableButton').hide();
			$('#createEmpTableButton').show();
		}, dbErrorhandler);
	});
}