// ScheduleView.js
import React, { useState, useEffect } from "react";
import helpers from "../utils/helpers";
import Schedulerr from "./Calendar"; // Ensure the path is correct

const ScheduleView = () => {
  const [empSchedules, setEmpSchedules] = useState([]);

  useEffect(() => {
    helpers.getEmpSchedules().then((response) => {
      if (response.data !== empSchedules) {
        setEmpSchedules(response.data);
      }
    });
  }, []);

  return (
    <div className="row">
      <div className="col s12">
        <div className="section">
          <h5>Calendar</h5>
          <Schedulerr />
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;