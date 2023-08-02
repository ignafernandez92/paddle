const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// Import the club_admin routes
const clubAdminRoutes = require('./club_admin');
// Mount the club_admin routes at the desired path
app.use('/club_admin', clubAdminRoutes);
app.use('/playerRoutes', playerRoutes);
