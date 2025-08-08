const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const times = require('./routes/api/times');

const cors = require('cors');

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// app.options('*', cors()); // handle preflight

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// You have these two redundant express parsers; can remove to avoid confusion
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Route mounting
app.use('/api/users', users);
app.use('/api/times', times);

// Fix environment variable name for port (uppercase PORT)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));