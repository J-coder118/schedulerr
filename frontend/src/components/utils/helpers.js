import axios from "axios";

const helper = {
  getAllEmployees() {
    return axios.get("/getAllEmployees");
  },

  getCurrentUser() {
    return axios.get("/user");
  },

  // errorMessage() {
  //   return axios.get("/register");
  // },

  getEmployee(id) {
    return axios.get(`/getEmployee/${id}`);
  },

  getEmpSchedules() {
    return axios.get('/getEmpSchedules')
      .then(response => response);
  },
  //////////////////////////// new function to get all schedules
  getSchedules() {
    return axios.get('/schedules')
      .then(response => response);
  },

  addSchedules(schedule) {
    return axios.post('/schedules', schedule);
  },

  updateSchedules(schedule) {
    return axios.put(`/schedules/${schedule.id}`, schedule);
  },

  deleteSchedules(id) {
    return axios.delete(`/schedules/${id}`);
  },
////////////////////////////////////////////////////////////////////
  addEmpSchedule(emp_id, firstName, lastName) {
    return axios.post('/addEmpSchedule', {
      emp_id,
      firstName,
      lastName
    });
  },

  updateEmpSchedule(empSchedule) {
    return axios.put(`/updateSchedule/${empSchedule._id}`, {
      employeeSchedule: empSchedule
    });
  },

  addEmployee(firstName, lastName, addressOne, addressTwo, city, state, zip, email, phone, phoneType) {
    return axios.post("/addEmployee", {
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state,
      zip,
      email,
      phone,
      phoneType
    });
  },

  updateEmployee(id, firstName, lastName, addressOne, addressTwo, city, state, zip, email, phone, phoneType) {
    return axios.put(`/updateEmployee/${id}`, {
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state,
      zip,
      email,
      phone,
      phoneType
    });
  },

  updateEmpName(emp_id, firstName, lastName) {
    return axios.put(`/updateEmpName/${emp_id}`, {
      firstName,
      lastName
    });
  },

  removeEmployee(id) {
    return axios.put(`/removeEmployee/${id}`);
  },

  removeEmpSchedule(emp_id) {
    return axios.put(`/removeEmpSchedule/${emp_id}`);
  },

  getAnnouncements() {
    return axios.get("/getAnnouncements");
  },

  addAnnouncements(title, content) {
    return axios.post("/addAnnouncements", {
      title,
      content
    });
  }
};

export default helper;