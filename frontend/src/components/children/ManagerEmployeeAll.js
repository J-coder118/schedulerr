import React, { useState, useEffect } from "react";
import helpers from '../utils/helpers';
import 'materialize-css/dist/css/materialize.min.css';
import Materialize from 'materialize-css';

const ManagerEmployeeAll = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    phoneType: "",
    allEmployees: [],
    selectedEmployee: "",
    emp_id: ""
  });

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = () => {
    helpers.getAllEmployees().then(response => {
      if (response.data !== state.allEmployees) {
        setState(prevState => ({ ...prevState, allEmployees: response.data }));
        activeButtons();
      }
    });
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddForm = (event) => {
    event.preventDefault();
    helpers.addEmployee(state.firstName, state.lastName, state.addressOne, state.addressTwo, state.city, state.state, state.zip, state.email, state.phone, state.phoneType).then(response => {
      setState(prevState => ({ ...prevState, emp_id: response.data._id }));

      helpers.addEmpSchedule(state.emp_id, state.firstName, state.lastName).then(() => {
        clearStates();
      });
    });
    Materialize.toast('Employee added', 3000);
    clearForm();
    getEmployees();
  };

  const handleUpdateForm = (event) => {
    event.preventDefault();
    helpers.updateEmployee(state.selectedEmployee, state.firstName, state.lastName, state.addressOne, state.addressTwo, state.city, state.state, state.zip, state.email, state.phone, state.phoneType).then(() => {});

    helpers.updateEmpName(state.emp_id, state.firstName, state.lastName).then(() => {
      clearStates();
    });
    Materialize.toast("Employee updated", 3000);
    clearForm();
    getEmployees();
  };

  const handleRemoveForm = (event) => {
    event.preventDefault();
    helpers.removeEmployee(state.selectedEmployee).then(() => {});
    helpers.removeEmpSchedule(state.emp_id).then(() => {
      clearStates();
    });
    Materialize.toast("Employee removed", 3000);
    clearForm();
    getEmployees();
  };

  const clickEmployee = (event) => {
    setState(prevState => ({ ...prevState, selectedEmployee: event.target.id }), () => {
      for (let i = 0; i < state.allEmployees.length; i++) {
        if (state.allEmployees[i]._id === state.selectedEmployee) {
          setState(prevState => ({
            ...prevState,
            firstName: state.allEmployees[i].firstName,
            lastName: state.allEmployees[i].lastName,
            addressOne: state.allEmployees[i].addressOne,
            addressTwo: state.allEmployees[i].addressTwo,
            city: state.allEmployees[i].city,
            state: state.allEmployees[i].state,
            zip: state.allEmployees[i].zip,
            email: state.allEmployees[i].email,
            phone: state.allEmployees[i].phone,
            phoneType: state.allEmployees[i].phoneType,
            emp_id: state.selectedEmployee
          }));
          activeButtons();
        }
      }
    });
  };

  const newEmployee = () => {
    clearForm();
    clearStates();
    activeButtons();
  };

  const clearForm = () => {
    const elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
      if ((elements[i].type === "text") || (elements[i].type === "number") || (elements[i].type === "email")) {
        elements[i].value = "";
        elements[i].classList.remove("valid");
      }
    }
    getEmployees();
  };

  const clearStates = () => {
    setState({
      firstName: "",
      lastName: "",
      addressOne: "",
      addressTwo: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
      phoneType: "",
      selectedEmployee: ""
    });
  };

  const activeButtons = () => {
    // don't allow updating or removing on empty form
    if (state.selectedEmployee === "") {
      document.getElementById("addEmployee").className = "btn btn-large waves-effect waves-light green accent-3";
      document.getElementById("updateEmployee").className += " disabled";
      document.getElementById("removeEmployee").className += " disabled";
    } else {
      document.getElementById("addEmployee").className += " disabled";
      document.getElementById("updateEmployee").className = "btn btn-large waves-effect waves-light blue accent-3";
      document.getElementById("removeEmployee").className = "btn btn-large waves-effect waves-light red accent-3";
    }
  };

  return (
    <div className="row">
      <div className="col m3">
        <table className="highlight" id="allEmployees">
          <thead>
            <tr>
              <th data-field="name">Employees</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="newEmployee" onClick={newEmployee}>
                <strong>New Employee<i className="material-icons right">add</i></strong>
              </td>
            </tr>
            {state.allEmployees.map((employee, i) => (
              <tr key={i}>
                <td onClick={clickEmployee} id={employee._id}>
                  {employee.firstName} {employee.lastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col m9">
        <div className="row">
          <form className="col m12" onSubmit={handleAddForm}>
            <div className="row">
              <div className="input-field col m6 s12">
                <input
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  className="validate"
                  value={state.firstName}
                  onChange={handleUserChange}
                  required />
              </div>
              <div className="input-field col m6 s12">
                <input
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  className="validate"
                  value={state.lastName}
                  onChange={handleUserChange}
                  required />
              </div>
            </div>
            <div className="row">
              <div className="input-field col m12 s12">
                <input
                  placeholder="Address One"
                  name="addressOne"
                  type="text"
                  className="validate"
                  value={state.addressOne}
                  onChange={handleUserChange}
                  required />
              </div>
            </div>
            <div className="row">
              <div className="input-field col m12 s12">
                <input
                  placeholder="Address Two"
                  name="addressTwo"
                  type="text"
                  className="validate"
                  value={state.addressTwo}
                  onChange={handleUserChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col m6 s12">
                <input
                  placeholder="City"
                  name="city"
                  type="text"
                  className="validate"
                  value={state.city}
                  onChange={handleUserChange}
                  required />
              </div>
              <div>
                <div className="input-field col m3 s6">
                  <select className="browser-default" name="state" value={state.state} onChange={handleUserChange} required>
                    <option value="" disabled>State</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </div>
                <div className="input-field col m3 s6">
                  <input
                    placeholder="Zip"
                    name="zip"
                    type="number"
                    className="validate"
                    value={state.zip}
                    onChange={handleUserChange}
                    required />
                </div>
              </div>
              <div className="row">
                <div className="input-field col m12 s12">
                  <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    className="validate"
                    value={state.email}
                    onChange={handleUserChange}
                    required />
                </div>
              </div>
              <div className="row">
                <div className="input-field col m8 s8">
                  <input
                    placeholder="Phone"
                    name="phone"
                    type="number"
                    className="validate"
                    value={state.phone}
                    onChange={handleUserChange}
                    required />
                </div>
                <div className="input-field col m4 s4">
                  <select className="browser-default" name="phoneType" value={state.phoneType} onChange={handleUserChange} required>
                    <option value="" disabled>Phone Type</option>
                    <option value="mobile">Mobile</option>
                    <option value="work">Work</option>
                    <option value="home">Home</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col s4">
                  <button id="addEmployee" className="btn btn-large waves-effect waves-light green accent-3" type="submit" value="Submit">Add
                    <i className="material-icons right">person_add</i>
                  </button>
                </div>
                <div className="col s4">
                  <a id="updateEmployee" className="btn btn-large waves-effect waves-light blue accent-3" onClick={handleUpdateForm}>Update
                    <i className="material-icons right">edit</i>
                  </a>
                </div>
                <div className="col s4">
                  <a id="removeEmployee" className="btn btn-large waves-effect waves-light red accent-3" onClick={handleRemoveForm}>Remove
                    <i className="material-icons right">person_outline</i>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerEmployeeAll;