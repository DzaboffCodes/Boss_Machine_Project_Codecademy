const express = require("express");
const db = require("../db");
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

// Get Request for array of ideas
ideasRouter.get("/", (req, res, next) => {
  // ToDo: get an array of all ideas
  const ideas = db.getAllFromDatabase("ideas");
  if (!ideas) {
    return res.status(404).send({ error: "Idea not found" });
  }
  res.status(200).send(ideas);
});

// Post Request to Add Idea
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  if (
    typeof req.body.numWeeks === "string" ||
    typeof req.body.weeklyRevenue === "string"
  ) {
    req.body.numWeeks = Number(req.body.numWeeks);
    req.body.weeklyRevenue = Number(req.body.weeklyRevenue);
  }
  const addNewIdea = db.addToDatabase("ideas", req.body);
  if (!addNewIdea) {
    return res.status(400).send({ error: "Invalid idea data provided" });
  } else {
    res.status(201).send(addNewIdea);
  }
});

// Get Request to get a single idea by id
ideasRouter.get("/:ideaId", (req, res, next) => {
  const idea = db.getFromDatabaseById("ideas", req.params.ideaId);
  if (!idea) {
    return res.status(404).send({ error: "Idea not found" });
  }
  res.status(200).send(idea);
});

// Put Request to update a single idea by id.
ideasRouter.put("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;

  // Step 1: Validate the ID format.
  if (isNaN(Number(ideaId))) {
    return res.status(404).send("Idea ID must be a number.");
  }

  // Step 2: Check if the idea exists.
  const existingIdea = db.getFromDatabaseById("ideas", ideaId);
  if (!existingIdea) {
    return res.status(404).send({ error: "Idea not found" });
  }

  // Step 3: Set the ID on the body for the update function.
  req.body.id = ideaId;

  // Step 4: **NEW** Call the middleware to validate the idea's value.
  // We pass it req, res, and a final callback function to run *if* the check passes.
  checkMillionDollarIdea(req, res, () => {
    // This code only runs if checkMillionDollarIdea calls next()

    // Convert types if needed.
    if (typeof req.body.numWeeks === "string") {
      req.body.numWeeks = Number(req.body.numWeeks);
    }
    if (typeof req.body.weeklyRevenue === "string") {
      req.body.weeklyRevenue = Number(req.body.weeklyRevenue);
    }

    // Attempt to update the instance in the database.
    const updatedIdea = db.updateInstanceInDatabase("ideas", req.body);
    if (!updatedIdea) {
      return res.status(400).send({ error: "Invalid idea data provided" });
    }

    // If everything is successful, send the updated idea.
    res.status(200).send(updatedIdea);
  });
});

// Delete Request to delete a single idea by id.
ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deletedIdea = db.deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (!deletedIdea) {
    return res.status(404).send({ error: "Idea not found" });
  }
  res.status(204).send("Idea has been deleted and database has been updated");
});

module.exports = ideasRouter;
