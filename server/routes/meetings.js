const express = require("express");
const db = require("../db");
const { createMeeting } = require("../db");
const meetingsRouter = express.Router();

// Get request to get all meetings
meetingsRouter.get("/", (req, res, next) => {
  const meetings = db.getAllFromDatabase("meetings");
  if (!meetings) {
    return res.status(404).send({ error: "Meetings not found" });
  }
  res.status(200).send(meetings);
});

// Post request to create new meetings
meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = createMeeting();
  const addNewMeeting = db.addToDatabase("meetings", newMeeting);
  if (!addNewMeeting) {
    return res.status(400).send({ error: "Invalid meeting data provided" });
  } else {
    res.status(201).send(addNewMeeting);
  }
});

// Delete Request for Meetings
meetingsRouter.delete("/", (req, res, next) => {
  const deletedMeetings = db.deleteAllFromDatabase("meetings");
  if (!deletedMeetings) {
    return res.status(404).send({ error: "No meetings to delete" });
  }
  res
    .status(204)
    .send("All meetings have been deleted and database has been updated");
});

module.exports = meetingsRouter;
