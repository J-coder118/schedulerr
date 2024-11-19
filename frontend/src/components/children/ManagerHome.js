import React, { useState, useEffect } from "react";
import helpers from "../utils/helpers";
import ScheduleView from "./ScheduleView";
import AnnouncementsBuild from "./AnnouncementsBuild";
import AnnouncementsView from "./AnnouncementsView";

const ManagerHome = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getAnnouncements();
  }, []);

  const getAnnouncements = () => {
    helpers.getAnnouncements().then((response) => {
      const latestAnnouncement = response.data[response.data.length - 1];
      setTitle(latestAnnouncement.title);
      setContent(latestAnnouncement.content);
    });
  };

  return (
    <div>
      <ScheduleView />
      <div className="row">
        <div className="col m6">
          <AnnouncementsView title={title} content={content} />
        </div>
        <div className="col m6">
          <AnnouncementsBuild />
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;