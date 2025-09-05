const express = require("express");
const db = require("../db");
const minionsRouter = express.Router();
const workRouter = require("./work");

// Middleware for Work Router
minionsRouter.use("/:minionId/work", workRouter);

// Get Request for array of minions
minionsRouter.get("/", (req, res, next) => {
  // ToDo: get an array of all minions
  const minions = db.getAllFromDatabase("minions");
  if (!minions) {
    return res.status(404).send({ error: "Minions not found" });
  }
  res.status(200).send(minions);
});

// Post Request to Add Minion
minionsRouter.post("/", (req, res, next) => {
  if (typeof req.body.salary === "string") {
    req.body.salary = Number(req.body.salary);
  }
  const addNewMinion = db.addToDatabase("minions", req.body);
  if (!addNewMinion) {
    return res.status(400).send({ error: "Invalid minion data provided" });
  } else {
    res.status(201).send(addNewMinion);
  }
});

// Get Request to get a single minion by id
minionsRouter.get("/:minionId", (req, res, next) => {
  const minion = db.getFromDatabaseById("minions", req.params.minionId);
  if (!minion) {
    return res.status(404).send({ error: "Minion not found" });
  }
  res.status(200).send(minion);
});

// Put Request to update a single minion by id.
minionsRouter.put("/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const existingMinion = db.getFromDatabaseById("minions", minionId);
  if (!existingMinion) {
    return res.status(404).send({ error: "Minion not found" });
  }

  if (typeof req.body.salary === "string") {
    req.body.salary = Number(req.body.salary);
  }

  req.body.id = minionId; // Ensure the ID in the body matches the URL parameter
  
  const updatedMinion = db.updateInstanceInDatabase("minions", req.body);
  if (!updatedMinion) {
    return res.status(400).send({ error: "Invalid minion data provided" });
  }
  res.status(200).send(updatedMinion);
});

// Delete Request to delete a single minion by id.
minionsRouter.delete("/:minionId", (req, res, next) => {
  const deletedMinion = db.deleteFromDatabasebyId(
    "minions",
    req.params.minionId
  );
  if (!deletedMinion) {
    return res.status(404).send({ error: "Minion not found" });
  }
  res.status(204).send("Minion has been deleted and database has been updated");
});

module.exports = minionsRouter;
