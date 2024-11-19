import React, { useState } from "react";
import helpers from "../utils/helpers";
import 'materialize-css/dist/css/materialize.min.css';
import Materialize from 'materialize-css';

const AnnouncementsBuild = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAnnouncementBuild = (event) => {
    const { id, value } = event.target;
    if (id === "title") setTitle(value);
    if (id === "content") setContent(value);
  };

  const addAnnouncements = (event) => {
    event.preventDefault();
    helpers.addAnnouncements(title, content).then(() => {
      clearStates();
    });
    Materialize.toast("Announcement added", 3000);
    clearForm();
  };

  const clearForm = () => {
    const elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
      elements[i].value = "";
      elements[i].classList.remove("valid");
    }
  };

  const clearStates = () => {
    setTitle("");
    setContent("");
  };

  return (
    <div className="card-panel">
      <div className="row">
        <div className="col s12">
          <h5>Make an announcement</h5>
        </div>
      </div>
      <form onSubmit={addAnnouncements}>
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Title"
              id="title"
              type="text"
              className="validate"
              value={title}
              onChange={handleAnnouncementBuild}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              placeholder="Announcement"
              id="content"
              type="text"
              className="materialize-textarea"
              value={content}
              onChange={handleAnnouncementBuild}
              required
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button
              className="btn waves-effect waves-light btn-large green accent-3 loginButtons"
              type="submit"
              value="Submit"
              name="action"
            >
              Submit<i className="material-icons right">add</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementsBuild;