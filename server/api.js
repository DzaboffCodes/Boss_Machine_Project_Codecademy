const express = require('express');

// API Routers
const apiRouter = express.Router();
const minionsRouter = require('./routes/minions');
const ideasRouter = require('./routes/ideas');
const meetingsRouter = require('./routes/meetings');


// Mounting Routers 
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);



module.exports = apiRouter;

