import React from 'react';
import './App.css';
import Employees from './Employees.js';
// import { Multiselect } from 'multiselect-react-dropdown';

//Filter and Sorting
//Filter by Name, Department, Title, Time with Company
//Sort by Name, Department, Title, Time with Company


//View Entire Employee Directory
class App extends React.Component {

    state = {
        employeeList: Employees
    }

    //Rendering the table
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

    filterList = (filterValue) => {
        let filterList = Employees;

        if (filterValue !== '') {
            filterList = Employees.filter(filter => filter.department === filterValue);
        }

        return this.setState({ employeeList: filterList });
    };

    render() {
        return (
            <div>

                <h1 id='title'>Employee Directory</h1>

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

                <label id='filterLabel' className='DropDown' htmlFor='filterByDepartment'>Filter By Department:</label>
                <select onChange={() => {
                    let filter = document.getElementById('filterByDepartment');
                    this.filterList(filter.value)
                }} id='filterByDepartment' className='DropDown'>
                    <option value=''>Please Select</option>
                    {this.departmentList()}
                </select>

                <table id='employeeTable'>

                    <thead id="tableHeader">
                        {this.tableHeader()}
                    </thead>

                    <tbody id="tableBody">
                        {this.viewEmployees()}
                    </tbody>
                </table>

            </div >
        );
    };
};

export default App;