import React, { useState, useEffect } from "react";
import helpers from "./utils/helpers";
import { Outlet } from 'react-router-dom';

const Manager = (props) => {
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    helpers.getCurrentUser().then((response) => {
      if (response.data.username !== username) {
        setPicture(response.data.picture);
        setUsername(response.data.username);
      }
    });
  }, [username]);

  return (
    <div>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <a className="black-text" href="/logout">
            Logout<i className="material-icons right">exit_to_app</i>
          </a>
        </li>
      </ul>
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <a href="/manager" className="brand-logo blue-text text-darken-1">
            <img id="logo" src="/assets/images/logo.png" />
            <span className="hide-on-med-and-down">Schedulr</span>
          </a>
          <a
            href="/"
            data-activates="slide-out"
            className="button-collapse blue-text text-darken-1"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a className="black-text" href="/manager/employeeAll">
                Employee Management<i className="material-icons right">group</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/schedulesCreate">
                Schedules<i className="material-icons right">access_time</i>
              </a>
            </li>
            <li>
              <a
                className="dropdown-button black-text"
                href="#"
                data-activates="dropdown1"
                data-beloworigin="true"
                data-hover="true"
              >
                {username}
                <img className="circle circle-small" src={picture} />
              </a>
            </li>
          </ul>
          <ul id="slide-out" className="side-nav">
            <li>
              <div className="userView">
                <div className="background">
                  <img src="http://materializecss.com/images/office.jpg" />
                </div>
                <a>
                  <img className="circle" src={picture} />
                </a>
                <a>
                  <span className="white-text">Company Name</span>
                </a>
                <a>
                  <span className="white-text name">{username}</span>
                </a>
              </div>
            </li>
            <li>
              <a href="/manager/employeeAll" className="black-text">
                <i className="material-icons">group</i>Employee Management
              </a>
            </li>
            <li>
              <a href="/manager/schedulesCreate" className="black-text">
                <i className="material-icons">access_time</i>Schedules
              </a>
            </li>
            <li>
              <a href="/logout" className="black-text">
                <i className="material-icons">exit_to_app</i>Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">{props.children}</div>
      <Outlet />
    </div>
  );
};

export default Manager;