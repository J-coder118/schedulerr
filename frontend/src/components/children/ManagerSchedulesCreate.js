import React, { useState, useEffect } from "react";
import helpers from "../utils/helpers";
import Schedulerr from "./Calendar";
import 'materialize-css/dist/css/materialize.min.css';
import Materialize from 'materialize-css';

const ManagerSchedulesCreate = () => {
  

  return (
    <div className="row">
      <div className="col m12">
        <div className="section" stype={{ width: "50%" }}>
          <h5>Schedule Editor</h5>
          <Schedulerr />
         
        </div>
      </div>
    </div>
  );
};

export default ManagerSchedulesCreate;