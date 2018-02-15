const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// Are we connected?
mongoose.connection.on('connected', () => {
    console.log('Connected to DB ' + config.database);
});

// Not connected
mongoose.connection.on('error', (err) => {
    console.log('DB error' + err);
});

// Initialize express
const app = express();

const users = require('./routes/users');

// Server port number
const port = 3000;

// Cors middleware for cross origin requests
app.use(cors());

// Set static/client side folder
app.use(express.static(path.join(__dirname, 'public')));

// body-parser middleware for parsing incoming 
app.use(bodyParser.json());

// Passport middlewares for authentication (jwt)
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// User routes (/users)
app.use('/users', users);
// Index route
app.get('/', (req, res) => {
    res.send('Invalid url');
});

// Set server to listen on pre-defined port
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

