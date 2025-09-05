const express = require('express');
const db = require('../db');
const workRouter = express.Router( {mergeParams: true} );

// Get Request get an array of all work for the specified minion at /api/minions/:minionId/work
workRouter.get('/', (req, res, next) => {
    const minionId = req.params.minionId;

    // Check for non-numeric minionId
    if (isNaN(Number(minionId))) {
        return res.status(404).send({ error: "Minion not found" });
    }

    // Check if minion exists
    const minion = db.getFromDatabaseById('minions', minionId);
    if (!minion) {
        return res.status(404).send({ error: "Minion not found" });
    }

    // Always return an array (even if empty)
    const work = db.getAllFromDatabase('work').filter(workItem => workItem.minionId === minionId);
    res.status(200).send(Array.isArray(work) ? work : []);
});

// Post Request create a new work object and save it to the database 
workRouter.post('/', (req, res, next) => {
    const minionId = req.params.minionId;

    // 1. Check for non-numeric minionId
    if (isNaN(Number(minionId))) {
        return res.status(404).send({ error: "Minion not found" });
    }

    // 2. Check if minion exists
    const minion = db.getFromDatabaseById('minions', minionId);
    if (!minion) {
        return res.status(404).send({ error: "Minion not found" });
    }

    // 3. Convert hours to number if needed
    if (typeof req.body.hours === 'string') {
        req.body.hours = Number(req.body.hours);
    }

    // 4. Set minionId on the work item
    req.body.minionId = minionId;

    // 5. Add to database
    const newWork = db.addToDatabase('work', req.body);
    if (!newWork) {
        return res.status(400).send({ error: "Invalid work data provided" });
    }
    res.status(201).send(newWork);
});

workRouter.put('/:workId', (req, res, next) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;

    // 1. Check for non-numeric minionId or workId
    if (isNaN(Number(minionId)) || isNaN(Number(workId))) {
        return res.status(404).send({ error: "Not found" });
    }

    // 2. Check if minion exists
    const minion = db.getFromDatabaseById('minions', minionId);
    if (!minion) {
        return res.status(404).send({ error: "Minion not found" });
    }

    // 3. Check if work exists
    const workItem = db.getFromDatabaseById('work', workId);
    if (!workItem) {
        return res.status(404).send({ error: "Work not found" });
    }

    // 4. If work exists but minionId does not match, return 400
    if (workItem.minionId !== minionId) {
        return res.status(400).send({ error: "Work does not belong to this minion" });
    }

    // 5. Update work
    req.body.id = workId;
    req.body.minionId = minionId;
    if (typeof req.body.hours === 'string') {
        req.body.hours = Number(req.body.hours);
    }

    const updatedWork = db.updateInstanceInDatabase('work', req.body);
    if (!updatedWork) {
        return res.status(400).send({ error: "Invalid work data provided" });
    }
    res.status(200).send(updatedWork);
});

// DELETE /api/minions/:minionId/work/:workId
workRouter.delete('/:workId', (req, res, next) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;

    // Find the work item and check ownership
    const workItem = db.getFromDatabaseById('work', workId);
    if (!workItem || workItem.minionId !== minionId) {
        return res.status(404).send({ error: "Work not found for this minion" });
    }

    db.deleteFromDatabasebyId('work', workId);
    res.status(204).send();
});

module.exports = workRouter;