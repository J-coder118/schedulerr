const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    id: {type: String},
    title: {type: String},
    isAllDay: {type: Boolean},
    start: {type: Date},
    end: {type: Date},
    category: {type: String},
    dueDateClass: {type: String},
    location: {type: String},
    raw: {type: Object},
    state: {type: String},
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;