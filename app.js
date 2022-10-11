
require('dotenv/config');


require('./db');


const express = require('express');

const app = express();
app.use('/public', express.static('public'));


require('./config')(app);

const { isAuthenticated } = require('./middleware/jwt.middleware');

require("dotenv").config();



const allRoutes = require('./routes/index.routes');
app.use('/api', allRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const profileRoutes = require('./routes/profile.routes.js');
app.use('/api', isAuthenticated, profileRoutes);

const requestRoutes = require('./routes/request.routes.js');
app.use('/api', requestRoutes);

const partyRoutes = require('./routes/party.routes');
app.use('/api', partyRoutes);

const chatRoutes = require('./routes/chat.routes');
app.use('/api', chatRoutes);

require('./error-handling')(app);

module.exports = app;