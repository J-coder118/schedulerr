import React from 'react';
import { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import helpers from "../utils/helpers";

import TUICalendar from "@toast-ui/react-calendar";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "./styles.css";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const calendars = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff"
  },
  {
    id: "2",
    name: "Company",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  }
];

function Schedulerr() {
  const cal = useRef(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  // const fetchSchedules = async () => {
  //     helpers.getSchedules().then((response) => {
  //     console.log("Fetched schedules:", response.data);
  //     setSchedules(response.data);
  //     });
  // };

  const fetchSchedules = async () => {
    try {
      helpers.getSchedules().then((response) => {
        console.log("Fetching schedules...", response.data);
        let new_schedules = response.data.map(schedule => ({
          ...schedule,
          // start: moment.utc(schedule.start).local().toDate(),
          // end: moment.utc(schedule.end).local().toDate()
        }));
        // console.log("test", response.data[0].start, moment.utc(response.data[0].start).local().toDate());
        // console.log("Fetched schedules:", response.data, "filtered data", schedules);
        setSchedules(new_schedules);
      });
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    if (cal.current) {
      const el = cal.current.calendarInst.getElement(id, calendarId);
      // console.log(e, el.getBoundingClientRect());
    }
  }, []);

  const onBeforeCreateSchedule = useCallback(async (scheduleData) => {
    console.log("creating new schedule", scheduleData);

    const schedule = {
      id: String(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start._date,//moment(scheduleData.start._date).utc().toDate(),
      end: scheduleData.end._date,//moment(scheduleData.end._date).utc().toDate(),
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw["class"]
      },
      state: scheduleData.state
    };

    if (cal.current) {
      cal.current.calendarInst.createSchedules([schedule]);
    }

    helpers.addSchedules(schedule).then(() => {
      fetchSchedules(); // Refresh schedules after adding a new one
    });
  }, []);

  const onBeforeDeleteSchedule = useCallback(async (res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

    if (cal.current) {
      cal.current.calendarInst.deleteSchedule(id, calendarId);
    }

    helpers.deleteSchedules(id).then(() => {
      fetchSchedules(); // Refresh schedules after deleting one
    });
    // Send the delete request to the backend
    
  }, []);

  const onBeforeUpdateSchedule = useCallback(async (e) => {
    console.log("events", e);

    const { schedule, changes, end, start } = e;

    schedule.start = start;
    schedule.end = end;

    if (cal.current) {
      cal.current.calendarInst.updateSchedule(
        schedule.id,
        schedule.calendarId,
        changes
      );
    }
    console.log("when update schedule time on frontend", schedule);
    helpers.updateSchedules(schedule).then((res) => {
      console.log("Schedule updated:", res.data);
    });
    // Send the update request to the backend

  }, []);

  function _getFormattedTime(time) {
    if (!time) return "";
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];

    if (!isAllDay && schedule.start) {
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function (schedule) {
      console.log(schedule);
      return _getTimeTemplate(schedule, false);
    }
  };

  return (
    <div className="App">
      <TUICalendar
        ref={cal}
        height="1000px"
        view="month"
        useCreationPopup={true}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
      
    </div>
  );
}


export default Schedulerr;

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
