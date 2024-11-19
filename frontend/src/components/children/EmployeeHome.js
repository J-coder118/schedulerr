import React, { useState, useEffect } from "react";
import helpers from "../utils/helpers";
import ScheduleView from "./ScheduleView";
import AnnouncementsView from "./AnnouncementsView";

const EmployeeHome = () => {
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
      <AnnouncementsView title={title} content={content} />
      <ScheduleView />
    </div>
  );
};

export default EmployeeHome;