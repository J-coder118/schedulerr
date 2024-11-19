import React from "react";

const AnnouncementsView = (props) => {
  return (
    <div className="card-panel">
      <div className="row">
        <div className="col s12">
          <h5>Latest announcement</h5>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h5>{props.title}</h5>
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsView;