import React from 'react';
import './App.css';
import Employees from './Employees.js';

class App extends React.Component {

    // Providing a state and filling it with data that can be altered later
    state = {
        employeeList: Employees
    }

    // Table Rendering
    // Rendering the table Header
    tableHeader() {
        return (
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Department</th>
                <th>Years With Company</th>
            </tr>
        )
    }

    // Rendering the table with employee information from the Employees.js file
    viewEmployees() {
        return this.state.employeeList.map((employee) => {
            return (
                <tr className="employeeChart" key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.department}</td>
                    <td id='ywc'>{employee.yearsWithCompany}</td>
                </tr>
            )
        });
    };


    //Filter and Sorting
    //Sort by First Name, Last Name, Department, Time with Company
    sortBy = (sortValue) => {

        let sortEmployeeList = this.state.employeeList;

        if (sortValue === 'Years With Company') {
            sortEmployeeList.sort((x, y) => {
                return y.yearsWithCompany - x.yearsWithCompany;
            })
        } else if (sortValue === 'First Name') {
            sortEmployeeList.sort((x, y) => {
                if (x.firstName < y.firstName) {
                    return -1;
                } else if (x.firstName > y.firstName) {
                    return 1;
                } else {
                    return 0;
                };
            });
        } else if (sortValue === 'Last Name') {
            sortEmployeeList.sort((x, y) => {
                if (x.lastName < y.lastName) {
                    return -1;
                } else if (x.lastName > y.lastName) {
                    return 1;
                } else {
                    return 0;
                };
            });
        } else if (sortValue === 'Department') {
            sortEmployeeList.sort((x, y) => {
                if (x.department < y.department) {
                    return -1;
                } else if (x.department > y.department) {
                    return 1;
                } else {
                    return 0;
                };
            });
        };

        return this.setState({ employeeList: sortEmployeeList });
    }

    // Generate the department list to go in the filter drop down box
    departmentList() {

        let departmentTemp = [];

        Employees.map((res, index) => {
            departmentTemp.push(res.department);
            return departmentTemp;
        });

        let departmentList = departmentTemp.filter((res, index) => {
            return departmentTemp.indexOf(res) === index;
        });

        return (

            departmentList.map((res, index) => {
                return (
                    <option key={index} value={res}>{res}</option>
                )
            })
        )
    }

    // Filter by Department
    filterByDepartment = (filterValue) => {
        let filterList = Employees;

        if (filterValue !== '') {
            filterList = Employees.filter(filter => filter.department === filterValue);
        }

        return this.setState({ employeeList: filterList });
    };

    // Render Page
    render() {
        return (
            <div>

                {/** Main Page Header */}
                <h1 id='title'>Employee Directory</h1>

                {/** Sort Drop Down */}
                <label id='sortLabel' className='DropDown' htmlFor='sortByDropDown'>Sort By:</label>
                <select onChange={() => {
                    let sort = document.getElementById('sortByDropDown');
                    this.sortBy(sort.value);
                }} id='sortByDropDown' className='DropDown'>
                    <option value=''>Please Select</option>
                    <option value='First Name'>First Name</option>
                    <option value='Last Name'>Last Name</option>
                    <option value='Department'>Department</option>
                    <option value='Years With Company'>Years With Company</option>
                </select>

                {/** Filter Drop Down */}
                <label id='filterLabel' className='DropDown' htmlFor='filterByDepartment'>Filter By Department:</label>
                <select onChange={() => {
                    let filter = document.getElementById('filterByDepartment');
                    this.filterByDepartment(filter.value)
                }} id='filterByDepartment' className='DropDown'>
                    <option value=''>Please Select</option>
                    {this.departmentList()}
                </select>

                {/** Main Table Layout */}
                <table id='employeeTable'>

                    {/** Table Header */}
                    <thead id="tableHeader">
                        {this.tableHeader()}
                    </thead>

                    {/** Table Body containing Employee Info */}
                    <tbody id="tableBody">
                        {this.viewEmployees()}
                    </tbody>
                </table>

            </div >
        );
    };
};

// Export App to Index.js
export default App;